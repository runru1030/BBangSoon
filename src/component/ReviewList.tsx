import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ReviewCmp } from "../assets/styles/global-style";
import ImgModal from "../component/ImgModal";
import { RootState } from "../modules";
import { setStoreInfo } from "../modules/store";
import { DBStoreType } from "../routes/Store";
import StarCmp from "./StarCmp";
export interface reviewProps {
    review: {
        id: number,
        reviewImg: string | null,
        content: string | null,
        star: number,
        nickName: string,
        date: Date,
        UserId: number,
    },
    userId: number,
}
const ReviewList: React.FC<reviewProps> = ({ review, userId }) => {
    const dispatch = useDispatch();
    const storeInfo: DBStoreType = useSelector((state: RootState) => state.store.storeObj);
    const onClickDel = () => {
        axios.delete(`/store/review/${review.id}`);

        axios.post(`/storeCrawl`, storeInfo).then(res => {
            dispatch(setStoreInfo({ ...storeInfo, ...res.data }));

        })
    }
    return (<><ReviewCmp className="list col-container">
        {review.reviewImg && <div className="reviewImg"><ImgModal src={review.reviewImg} width="200%" /></div>}
        <div className="row-container wrapper">
            <StarCmp reviewStar={review.star} />
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