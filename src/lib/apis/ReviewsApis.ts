import { reviewState } from "@app/store/[storeId]/components/ReviewForm";
import axios from "axios";

const postReview = async (reviewData: reviewState) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews`,
      {
        data: reviewData,
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
const postReviewImg = async (reviewFormData: FormData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/store-imgs`,
      reviewFormData
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
const getReviewsOfStore = async (storeId: number) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews?populate[store_imgs][populate]=*&filters[store][id][$eq]=${storeId}&sort=createdAt:desc`
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};
export const strapiReviewsApi = {
  postReview,
  getReviewsOfStore,
  postReviewImg,
};
