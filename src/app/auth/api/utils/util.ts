import axios from "axios";
const jwt = require("jsonwebtoken");

const getJWTToken = (userInfo: { email: string; userName: string }) => {
  return jwt.sign(
    {
      ...userInfo,
    },
    process.env.NEXT_SERVER_JWT_SECRET,
    {
      issuer: "bbangsoon",
    }
  );
};
const getJWTUser = (jwtToken: string) => {
  return jwt.verify(jwtToken, process.env.NEXT_SERVER_JWT_SECRET, {
    ignoreExpiration: true,
  });
};

const getStrapiUser = async (email: string) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `http://localhost:1337/api/auth-users?filters[email][$eq]=${email}`
    );
    return { attributes: data[0].attributes };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};
export const jwtUtil = { getJWTToken, getJWTUser };
export const strapiUtil = { getStrapiUser };
