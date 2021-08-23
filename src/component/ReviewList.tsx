import { faBreadSlice} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ImgModal from "../component/ImgModal";
type review={
    review:{
    reviewImg:string|null,
    content:string|null,
    star:number,
    nickName: string,
    date: Date}
}
const ReviewList:React.FC<review> = ({review}) => {
 
    return (<><List className="list review">
                        {review.reviewImg&&<div className="reviewImg"><ImgModal src={review.reviewImg}  width="200%"/></div>}
                        <div className="star">
                            <span id="star">
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 1 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 2 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 3 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 4 ? "#e2c26e" : "#cabfa3"} />
                                <FontAwesomeIcon icon={faBreadSlice} color={review.star >= 5 ? "#e2c26e" : "#cabfa3"} />
                            </span>
                            <span>{review.star}</span>
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
`