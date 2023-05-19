import axios from "axios";

const getUser = async (email: string) => {
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

export const strapiAuthUsersApi = { getUser };
