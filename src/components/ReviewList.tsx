import { userInfoAtoms } from "@app/GlobalProvider";
import { storeInfoAtoms } from "@app/store/[storeId]/StoreInfoProvider";
import { strapiReviewsApi } from "@lib/apis/ReviewsApis";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import styled from "styled-components";
import ImgModal from "./ImgModal";
import StarCmp from "./StarCmp";
export interface reviewProps {
  id: number;
  attributes: {
    store_imgs: { url: string };
    auth_user: { id: number; userName: string };
    content: string | null;
    star: number;
    createdAt: Date;
  };
}
const ReviewList: React.FC<reviewProps> = ({ id, attributes }) => {
  const [storeInfo, setStoreInfo] = useAtom(storeInfoAtoms.storeAtom);
  const userAtom = useAtomValue(userInfoAtoms.userAtom);
  const queryClient = useQueryClient();
  const deleteReview = useMutation({
    mutationFn: async (reviewId: number) =>
      await strapiReviewsApi.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getStoreReviews"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="flex flex-col w-full border-t border-gray-1000 p-3 gap-1">
      {!!attributes.store_imgs && (
        <ImgWrapper>
          <ImgModal
            src={`${process.env.NEXT_PUBLIC_DOMAIN}${attributes.store_imgs.url}`}
            width="200%"
          />
        </ImgWrapper>
      )}
      <span>{attributes.auth_user.userName}</span>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600 font-light">
          <StarCmp reviewStar={attributes.star} />
          <span>|</span>
          <span id="date">
            {new Date(attributes.createdAt).getFullYear()}.
            {new Date(attributes.createdAt).getMonth() + 1}.
            {new Date(attributes.createdAt).getDate()}
          </span>
        </div>
        {userAtom.id === attributes.auth_user.id && (
          <button
            className="text-gray-600 text-sm"
            onClick={() => deleteReview.mutate(id)}
          >
            삭제
          </button>
        )}
      </div>
      <span>{attributes.content}</span>
    </div>
  );
};
export default ReviewList;
const ImgWrapper = styled.div`
  max-width: 100%;
  max-height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
