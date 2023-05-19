import { strapiAuthUsersApi } from "@lib/apis/AuthUsersApis";
import { jwtUtil } from "./utils/util";

export async function GET(req: Request) {
  try {
    if (!req.headers.get("authorization"))
      return new Response("token 없음.", {
        status: 401,
      });

    const jwtUser = jwtUtil.getJWTUser(
      req.headers.get("authorization") as string
    );
    let userInfo = {
      email: jwtUser.email,
      userName: jwtUser.userName,
      id: -1,
    };
    const { attributes } = await strapiAuthUsersApi.getUser(userInfo.email);
    userInfo.id = attributes.id;

    if (!attributes)
      return new Response("user 없음.", {
        status: 404,
      });

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
