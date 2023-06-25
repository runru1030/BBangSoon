import axios from "axios";

const postReview = async (reviewFormData: FormData) => {
  try {
    const res = await axios.post(
      "http://localhost:1337/api/reviews",
      reviewFormData
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const strapiReviewsApi = { postReview };
