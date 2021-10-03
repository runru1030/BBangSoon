import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import styled from "styled-components";
import ImgModal from "../component/ImgModal";
type review = {
    review: {
        id:number,
        reviewImg: string | null,
        content: string | null,
        star: number,
        nickName: string,
        date: Date,
        UserId:number
    },
    userId:number
}
const ReviewList: React.FC<review> = ({ review, userId }) => {
    const onClickDel=()=>{
        axios.delete(`/store/review/${review.id}`);
    }
    return (<><List className="list review">
        {review.reviewImg && <div className="reviewImg"><ImgModal src={review.reviewImg} width="200%" /></div>}
        <div className="row-container wrapper">
        <div className="star">
            <span id="star">
                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 1 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 2 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 3 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 4 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 5 ? "#e2c26e" : "#cabfa3"} />
            </span>
            <span id="text">{review.star}점</span>
        </div>
            {userId==review.UserId&&<span onClick={onClickDel} id="del-btn">삭제</span>}
            </div>
        <span id="">{review.content}</span>
        <div className="detail">
            <span id="nickName">{review.nickName}</span>
            <span id="">{new Date(review.date).getFullYear()}.{new Date(review.date).getMonth() + 1}.{new Date(review.date).getDate()}</span>
        </div>
    </List>
    </>)
}
export default ReviewList;
const List = styled.div`
width: 90%;
font-size: medium;
padding: 15px;
border-top: solid thin #dddddd;
  display: flex;
.wrapper{
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
}
.wrapper >#del-btn{
    flex: 1;
    text-align: end;
    font-size: small;
    color: #aaaaaa;
}
.star{
    background-color: #f3ecdc;
    padding: 5px 10px;
    border-radius: 5px;
}
.star #text{
    font-weight: lighter;
    font-size: small;
    margin-left: 5px;
}
`