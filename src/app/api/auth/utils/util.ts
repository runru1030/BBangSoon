import jwt from "jsonwebtoken";
const getJWTToken = (userInfo: { email: string; userName: string }) => {
  return jwt.sign(
    {
      ...userInfo,
    },
    process.env.NEXT_SERVER_JWT_SECRET || "",
    {
      issuer: "bbangsoon",
    }
  );
};
const getJWTUser = (jwtToken: string) => {
  return jwt.verify(jwtToken, process.env.NEXT_SERVER_JWT_SECRET || "", {
    ignoreExpiration: true,
  });
};

export const jwtUtil = { getJWTToken, getJWTUser };
