import axios from "axios";
import KakaoAuth from "../utils/KakaoAuth";
import { jwtUtil } from "../utils/util";
import { strapiAuthUsersApi } from "@lib/apis/AuthUsersApis";

export async function PUT(req: Request) {
  try {
    const { access_token } = await req.json();

    if (!access_token)
      return new Response("token 없음.", {
        status: 401,
      });

    const result: any = await KakaoAuth.getProfile(access_token);
    const kakaoUser = JSON.parse(result).kakao_account;
    let userInfo = {
      email: kakaoUser.email,
      userName: kakaoUser.profile.nickname,
      id: -1,
    };

    const { attributes } = await strapiAuthUsersApi.getUser(userInfo.email);
    userInfo.id = attributes.id;

    if (!attributes) {
      const {
        data: { data },
      } = await axios.post("http://localhost:1337/api/auth-users", {
        data: { ...userInfo, kakaoToken: access_token },
      });
      userInfo.id = data.attributes.id;
    }

    return new Response(
      JSON.stringify({
        success: true,
        jwt: jwtUtil.getJWTToken(userInfo),
        user: { ...userInfo },
      }),
      {
        status: !attributes ? 201 : 200,
      }
    );
  } catch (err: any) {
    return new Response("test", {
      status: 500,
    });
  }
}
