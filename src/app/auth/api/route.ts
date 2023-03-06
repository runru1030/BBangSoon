import axios from "axios";
import KakaoAuth from "./utils/KakaoAuth";
import { jwtUtil, strapiUtil } from "./utils/util";

export async function PUT(req: Request) {
  try {
    let userInfo = { email: "", userName: "" };
    const { access_token } = await req.json();

    if (access_token) {
      //카카오 로그인
      const result: any = await KakaoAuth.getProfile(access_token);
      const kakaoUser = JSON.parse(result).kakao_account;
      userInfo.email = kakaoUser.email;
      userInfo.userName = kakaoUser.profile.nickname;
    } else {
      //jwt token 자동 로그인
      userInfo = { ...jwtUtil.getJWTUser(req.headers.auth) };
    }
    const { attributes } = await strapiUtil.getStrapiUser(userInfo.email);
    if (!attributes) {
      await axios.post("http://localhost:1337/api/auth-users", {
        data: { ...userInfo, kakaoToken: access_token },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        jwt: jwtUtil.getJWTToken(userInfo),
        user: { ...userInfo },
      }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return new Response("test", {
      status: 500,
    });
  }
}
