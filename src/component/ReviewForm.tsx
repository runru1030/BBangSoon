import { faBreadSlice, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreInfo } from "../modules/store";
type props = {
    storeId: number,
    setIsWrite: React.Dispatch<React.SetStateAction<boolean>>
}
const ReviewForm: React.FC<props> = ({ storeId, setIsWrite }) => {
    const dispatch =useDispatch();

    const storeInfo: storeObj = useSelector((state: any) => state.store.storeObj);
    const { userObj } = useSelector((state: any) => ({
        userObj: state.user.userObj,
        isLoggedin: state.user.isLoggedin,
    }))

    /* 리뷰 작성 */
    const [reviewImg, setReviewImg] = useState(null);
    const [newReview, setNewReview] = useState<review>({
        content: "",
        star: 0,
        attach: "",
        nickName: "익명",
    })
    const onClickStar = (idx: string) => {
        setNewReview({ ...newReview, star: parseInt(idx) });
    }
    const onSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('reviewImg', reviewImg || "");
        formData.append('content', newReview.content);
        formData.append('nickName', newReview.nickName);
        formData.append('star', newReview.star.toString());
        formData.append('UserId', userObj.id);
        axios.post(`/store/review/${storeId}`, formData).then(res => {
            dispatch(setStoreInfo({...storeInfo,...res.data}));
        })
        setNewReview({
            content: "",
            star: 0,
            attach: "",
            nickName: "익명",
        })
        setReviewImg(null);
        setIsWrite(false);
    }
    const onFileChange = (e: any) => {
        const { target: { files } } = e;
        const theFile = files[0];
        setReviewImg(files[0])

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            setNewReview({ ...newReview, attach: finishedEvent.target?.result || "" })
        };
        reader.readAsDataURL(theFile);
    }

    return (<>
        {/* writing review's form */}
        <form onSubmit={onSubmit} className="review-form">
            {newReview.attach && <img src={newReview.attach} width="60%" />}
            <span id="star">
                <FontAwesomeIcon id="1" icon={faBreadSlice} onClick={(event) => onClickStar(event.currentTarget.id)} color={newReview.star >= 1 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon id="2" icon={faBreadSlice} onClick={(event) => onClickStar(event.currentTarget.id)} color={newReview.star >= 2 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon id="3" icon={faBreadSlice} onClick={(event) => onClickStar(event.currentTarget.id)} color={newReview.star >= 3 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon id="4" icon={faBreadSlice} onClick={(event) => onClickStar(event.currentTarget.id)} color={newReview.star >= 4 ? "#e2c26e" : "#cabfa3"} />
                <FontAwesomeIcon id="5" icon={faBreadSlice} onClick={(event) => onClickStar(event.currentTarget.id)} color={newReview.star >= 5 ? "#e2c26e" : "#cabfa3"} />
                <span id="small">{newReview.star}</span>
                <div className="wrapper">
                    <label htmlFor="file"><FontAwesomeIcon icon={faPlus} /></label>
                    <label htmlFor="submit" id="sbm-btn"><span>작성</span></label>
                </div>
            </span>
            <TextareaAutosize id="content" placeholder="최대 300자 / 이미지 최대 1장" value={newReview.content} onChange={(event) => setNewReview({ ...newReview, content: event.target.value.substring(0, 300) })} />
            <input id="file" type="file" style={{ "display": "none" }} onChange={onFileChange} />
            <input id="submit" type="submit" value="제출" style={{ "display": "none" }} />
        </form>
    </>)
}
export default ReviewForm;

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
type review = {
    content: string,
    star: number,
    attach: any,
    nickName: string
}