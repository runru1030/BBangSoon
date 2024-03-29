import axios from "axios";

const getUser = async (email: string) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth-users?filters[email][$eq]=${email}`
    );

    return { attributes: { id: data[0].id, ...data[0].attributes } };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};

const createUser = async ({
  userInfo,
  kakaoToken,
}: {
  userInfo: {
    email: string;
    userName: string;
    id: number;
  };
  kakaoToken: string;
}) => {
  try {
    const {
      data: { data },
    } = await axios.post("${process.env.NEXT_PUBLIC_DOMAIN}/api/auth-users", {
      data: { ...userInfo, kakaoToken },
    });

    return { attributes: data.attributes };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};
export const strapiAuthUsersApi = { getUser, createUser };
