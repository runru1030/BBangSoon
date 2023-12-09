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
const deleteReview = async (reviewId: number) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews/${reviewId}`
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
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/reviews?populate[0]=auth_user&populate[1]=store_imgs.img&filters[store][id][$eq]=${storeId}&sort=createdAt:desc`
    );
    return {
      data: [
        ...data.map((review: any) => ({
          id: review.id,
          attributes: {
            content: review.attributes.content,
            star: review.attributes.star,
            createdAt: review.attributes.createdAt,
            userId: review.attributes.auth_user.data.id,
            imgUrl:
              review.attributes.store_imgs.data[0]?.attributes?.img?.data
                ?.attributes?.url,
          },
        })),
      ],
    };
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};
export const strapiReviewsApi = {
  postReview,
  deleteReview,
  getReviewsOfStore,
  postReviewImg,
};
