import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReviewCmp } from "../assets/styles/global-style";
import ImgModal from "../component/ImgModal";
import { setStoreInfo } from "../modules/store";
import StarCmp from "./StarCmp";
type review = {
    review: {
        id: number,
        reviewImg: string | null,
        content: string | null,
        star: number,
        nickName: string,
        date: Date,
        UserId: number
    },
    userId: number
}
const ReviewList: React.FC<review> = ({ review, userId }) => {
    const dispatch = useDispatch();
    const storeInfo: storeObj = useSelector((state: any) => state.store.storeObj);
    const onClickDel = () => {
        axios.delete(`/store/review/${review.id}`);

        axios.post(`/storeCrawl`, storeInfo).then(res => {
            dispatch(setStoreInfo({ ...storeInfo, ...res.data }));

        })
    }
    return (<><ReviewCmp className="list col-container">
        {review.reviewImg && <div className="reviewImg"><ImgModal src={review.reviewImg} width="200%" /></div>}
        <div className="row-container wrapper">
            <StarCmp reviewStar={review.star}/>
            {userId == review.UserId && <span onClick={onClickDel} id="del-btn">삭제</span>}
        </div>
        <span id="content">{review.content}</span>
        <div className="detail">
            <span id="nickName">{review.nickName}</span>
            <span id="date">{new Date(review.date).getFullYear()}.{new Date(review.date).getMonth() + 1}.{new Date(review.date).getDate()}</span>
        </div>
    </ReviewCmp>
    </>)
}
export default ReviewList;
type storeObj = {
    id: number,
    address: string | null,
    storeName: string | null,
    telephone: string | null,
    site: string | null,
    x: number,
    y: number,
    reviewCnt: number | null,
    avgStar: number | null,
    Reviews: [] | null,
    Visits: [] | null,
    Wishes: [] | null,
    StoreImgs: any[] | null,
    Menus: [] | null,
}