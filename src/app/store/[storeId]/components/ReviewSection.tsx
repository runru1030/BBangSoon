import ReviewForm from "@app/store/[storeId]/components/ReviewForm";
import ReviewItem, { reviewProps } from "@components/ReviewItem";
import { strapiReviewsApi } from "@lib/apis/ReviewsApis";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useAtom } from "jotai";
import { openedStoreInfoAtom, storeInfoAtoms } from "../StoreInfoProvider";

const ReviewSection = () => {
  const [storeInfo, setStoreInfo] = useAtom(storeInfoAtoms.storeAtom);
  const [openedStoreInfo, setOpenedStoreInfo] = useAtom(openedStoreInfoAtom);

  useQuery(["getStoreReviews", { storeInfo }], {
    queryFn: async () => {
      return await strapiReviewsApi.getReviewsOfStore(storeInfo.id);
    },
    onSuccess: (res: any) => {
      setStoreInfo({ ...storeInfo, reviews: res.data });
    },
    onError: (err: any) => {
      console.error(err);
    },
    retry: false,
    enabled: storeInfo.id !== 0,
  });
  return (
    <div>
      <div
        id="review"
        onClick={() => setOpenedStoreInfo("review")}
        className={clsx(
          "flex items-center p-3 justify-between",
          openedStoreInfo === "review" ? "text-blue" : ""
        )}
      >
        <span>리뷰</span>
        {openedStoreInfo === "review" && <ReviewForm.triggerBtn />}
      </div>

      {openedStoreInfo === "review" && (
        <>
          <ReviewForm />
          <div>
            {storeInfo.reviews?.length === 0 ? (
              <div className="flex justify-center w-full">리뷰가 없어용</div>
            ) : (
              storeInfo.reviews?.map((review: reviewProps) => (
                <ReviewItem {...{ ...review }} key={review.id} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ReviewSection;
