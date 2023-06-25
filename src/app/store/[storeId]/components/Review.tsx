import ReviewForm from "@app/store/[storeId]/components/ReviewForm";
import ReviewList, { reviewProps } from "@components/ReviewList";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import { openedStoreInfoAtom } from "../PageContent";
import { storeInfoAtoms } from "../StoreInfoProvider";

const Review = () => {
  const storeInfo = useAtomValue(storeInfoAtoms.storeAtom);
  const [openedStoreInfo, setOpenedStoreInfo] = useAtom(openedStoreInfoAtom);
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
            {storeInfo.Reviews?.length === 0 ? (
              <div className="flex justify-center w-full">리뷰가 없어용</div>
            ) : (
              storeInfo.Reviews?.map((review: reviewProps["review"]) => (
                <ReviewList review={review} key={review.id} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Review;
