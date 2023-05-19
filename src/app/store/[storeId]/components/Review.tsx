import ReviewForm from "@app/store/[storeId]/components/ReviewForm";
import ReviewList, { reviewProps } from "@components/ReviewList";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import styled from "styled-components";
import { DBStoreType, openedStoreInfoAtom } from "../PageContent";
import { storeInfoAtoms } from "../StoreInfoProvider";

const Review = () => {
  const storeInfo: DBStoreType = useAtomValue(storeInfoAtoms.storeAtom);
  const [openedStoreInfo, setOpenedStoreInfo] = useAtom(openedStoreInfoAtom);
  return (
    <div>
      <Label
        id="review"
        onClick={() => setOpenedStoreInfo("review")}
        className={clsx(openedStoreInfo === "review" ? "text-blue" : "")}
      >
        <span>리뷰</span>
        {openedStoreInfo === "review" && <ReviewForm.triggerBtn />}
      </Label>
      {openedStoreInfo === "review" && (
        <>
          <ReviewForm storeId={storeInfo.storeId} />
          <div>
            {storeInfo.Reviews && storeInfo.Reviews?.length !== 0 ? (
              storeInfo.Reviews?.map((review: reviewProps["review"]) => (
                <ReviewList review={review} key={review.id} />
              ))
            ) : (
              <div className="flex justify-center w-full">리뷰가 없어용</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Review;
const Label = styled.div`
  font-size: medium;
  padding: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  span {
    flex: 1;
  }
`;
