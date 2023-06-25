import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import StarCmp from "./StarCmp";
import { StrapiStoreType } from "@app/store/[storeId]/StoreInfoProvider";
// import StoreList, { StoreType } from "./StoreItem";
const Review: React.FC = () => {
  const router = useRouter();
  // const { review } = useSelector((state: RootState) => ({
  //   review: state.review.review,
  // }));
  // const review = {};
  const [store, setStore] = useState<StrapiStoreType>(); // DetailReview's store

  // const onClickDel = () => {
  //   axios.delete(`/store/review/${review.id}`).then(() => {
  //     router.push("/feed");
  //   });
  // };
  // useEffect(() => {
  //   axios.post(`/store/${review.StoreId}`).then((res) => setStore(res.data));
  // }, []);
  return (
    <Container>
      {/* {store != undefined && <StoreList store={store} />} */}
      {/* {review.reviewImg && (
        <ImgWrapper>
          <img src={review.reviewImg} />
        </ImgWrapper>
      )}
      <ReviewCmp className="col-container">
        <Wrapper className="row-container">
          <StarCmp reviewStar={review.star} />
          <DateBox>
            {new Date(review.date).getFullYear()}.
            {new Date(review.date).getMonth() + 1}.
            {new Date(review.date).getDate()}
          </DateBox>
          <Button onClick={onClickDel}>삭제</Button>
        </Wrapper>
        <Content>{review.content}</Content>
      </ReviewCmp> */}
      <Nav />
    </Container>
  );
};
export default Review;
const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;
const Content = styled.span`
  font-weight: lighter;
`;
const ImgWrapper = styled.div`
  width: 100vw;
  height: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    object-fit: cover;
  }
`;
const DateBox = styled.div`
  flex: 1;
  text-align: end;
  font-weight: lighter;
`;
const Button = styled.button`
  margin-left: 10px;
  font-size: small;
  color: #aaaaaa;
`;
const ReviewCmp = styled.div`
  align-items: flex-start;
  width: 90%;
  font-size: medium;
  padding: 15px;
  border-top: ${(props) => `solid thin` + props.theme.color.border_grey};
`;
