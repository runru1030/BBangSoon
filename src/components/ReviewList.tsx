import { userInfoAtoms } from "@app/GlobalProvider";
import { storeInfoAtoms } from "@app/store/[storeId]/StoreInfoProvider";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import styled from "styled-components";
import ImgModal from "./ImgModal";
import StarCmp from "./StarCmp";
export interface reviewProps {
  review: {
    id: number;
    reviewImg: string | null;
    content: string | null;
    star: number;
    nickName: string;
    date: Date;
    UserId: number;
  };
}
const ReviewList: React.FC<reviewProps> = ({ review }) => {
  const [storeInfo, setStoreInfo] = useAtom(storeInfoAtoms.storeAtom);
  const userAtom = useAtomValue(userInfoAtoms.userAtom);

  const onClickDel = () => {
    axios.delete(`/store/review/${review.id}`);
    axios.post(`/storeCrawl`, storeInfo).then((res) => {
      setStoreInfo({ ...storeInfo, ...res.data });
    });
  };
  return (
    <Container className="col-container">
      {review.reviewImg && (
        <ImgWrapper>
          <ImgModal src={review.reviewImg} width="200%" />
        </ImgWrapper>
      )}
      <Wrapper className="row-container">
        <StarCmp reviewStar={review.star} />
        {userAtom.id === review.UserId && (
          <Button onClick={onClickDel}>삭제</Button>
        )}
      </Wrapper>
      <span id="content">{review.content}</span>
      <Detail>
        <span id="nickName">{review.nickName}</span>
        <span id="date">
          {new Date(review.date).getFullYear()}.
          {new Date(review.date).getMonth() + 1}.
          {new Date(review.date).getDate()}
        </span>
      </Detail>
    </Container>
  );
};
export default ReviewList;

const Container = styled.div`
  align-items: flex-start;
  width: 90%;
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
  margin-bottom: 15px;
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
