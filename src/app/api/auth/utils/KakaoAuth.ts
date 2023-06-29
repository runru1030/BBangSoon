import request from "request";

export default {
  getProfile(accessToken: string) {
    return new Promise((resolve, reject) => {
      request(
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          url: "https://kapi.kakao.com/v2/user/me",
           method: "GET",
        },
        (error: any, response: any, body: any) => {
          if (!error && response.statusCode === 200) {
            resolve(body);
          }
          reject(error);
        }
      );
    });
  },
  // logout(accessToken) {
  //   console.log(accessToken);
  //   return new Promise((resolve, reject) => {
  //     request(
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         url: "https://kapi.kakao.com/v1/user/logout",
  //         method: "POST",
  //       },
  //       (error, response, body) => {
  //         if (!error && response.statusCode === 200) {
  //           resolve(body);
  //         }
  //         reject(error);
  //       }
  //     );
  //   });
  // },
};
