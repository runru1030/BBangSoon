import axios from "axios";

const getNearbyStores = async ({
  curr_x,
  curr_y,
}: {
  curr_x: number;
  curr_y: number;
}) => {
  try {
    const { data } = await axios.get(
      `http://localhost:1337/api/nearby-stores?curr_x=${curr_x}&curr_y=${curr_y}`
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};

const getStore = async (sotreId: string) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `http://localhost:1337/api/stores?filters[store_id][$eq]=${sotreId}`
    );

    return { data: data[0].attributes };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};

export const strapiStoresApi = { getNearbyStores, getStore };
