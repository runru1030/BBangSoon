import { userInfoAtoms } from "@app/GlobalProvider";
import { strapiReviewsApi } from "@lib/apis/ReviewsApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import styled from "styled-components";
import ImgModal from "./ImgModal";
import StarCmp from "./StarCmp";
export interface reviewProps {
  id: number;
  attributes: {
    userId: number;
    imgUrl: string;
    content: string | null;
    star: number;
    nickName: string;
    createdAt: Date;
  };
}
const ReviewList: React.FC<reviewProps> = ({ id, attributes }) => {
  const userAtom = useAtomValue(userInfoAtoms.userAtom);
  const isMine = attributes.userId === userAtom.id;

  const queryClient = useQueryClient();
  const deleteReview = useMutation({
    mutationFn: async (reviewId: number) =>
      await strapiReviewsApi.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getStoreReviews"]);
    },
    onError: (err) => {
      console.error(err);
      alert("리뷰 삭제에 실패했습니다.");
    },
  });
  return (
    <Container className="col-container">
      {attributes.imgUrl && (
        <ImgWrapper>
          <ImgModal
            src={`${process.env.NEXT_PUBLIC_DOMAIN}${attributes.imgUrl}`}
            width="200%"
          />
        </ImgWrapper>
      )}
      <Wrapper className="row-container">
        <StarCmp reviewStar={attributes.star} />
        {isMine && (
          <Button onClick={() => deleteReview.mutate(id)}>삭제</Button>
        )}
      </Wrapper>
      <span id="content" className="px-1">
        {attributes.content}
      </span>
      <Detail>
        <span id="date" className="px-1">
          {new Date(attributes.createdAt).getFullYear()}.
          {new Date(attributes.createdAt).getMonth() + 1}.
          {new Date(attributes.createdAt).getDate()}
        </span>
      </Detail>
    </Container>
  );
};
export default ReviewList;

const Container = styled.div`
  align-items: flex-start;
  width: 100%;
  font-size: medium;
  padding: 15px;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
  > div {
    padding: 10px 0;
  }
  #date,
  #content {
    font-weight: lighter;
  }
`;
const Detail = styled.div`
  span {
    margin-right: 5px;
    color: #6f6f6f;
  }
`;
const Button = styled.button`
  flex: 1;
  text-align: end;
  font-size: small;
  color: #aaaaaa;
`;
const Wrapper = styled.div`
  align-items: center;
  width: 100%;
`;
const ImgWrapper = styled.div`
  max-width: 100%;
  max-height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
