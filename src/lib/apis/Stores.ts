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
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/nearby-stores?curr_x=${curr_x}&curr_y=${curr_y}`
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};

const getStore = async (storeId: string) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/stores/${storeId}`
    );

    return { data: { id: data.id, ...data.attributes } };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};

const getStoreThumbNail = async (storeId: string) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/store-imgs?filters[store][id][$eq]=${storeId}&pagination[limit]=3&populate=*`
    );

    return { data: data.map((d: any) => d.attributes.img.data.attributes) };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};

export const strapiStoresApi = { getNearbyStores, getStore, getStoreThumbNail };
