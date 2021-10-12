import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Nav from "../component/Nav";
import ImgModal from "../component/ImgModal";
import { useSelector } from "react-redux";
import { Grid, Header, Label } from '../assets/styles/global-style';
import { RootState } from "../modules";
interface img {
    imageUrl: string
}
const StoreImg = () => {
    const storeInfo = useSelector((state: RootState) => state.store.storeObj)
    const [storeImgArr, setStoreImgArr] = useState<img[]>([]);

    useEffect(() => {
        axios.post(`/store/image/${storeInfo.id}`).then(res => {
            setStoreImgArr(res.data);
        })
    }, [])

    return (<>
        <div className="store">
            <Header >
                <span id="storeName">{storeInfo.place_name}</span>
                <div className="wrapper">
                    <span>{storeInfo.reviewCnt}</span>
                    <span id="small">리뷰</span>
                </div>
                <div className="wrapper">
                    <span>{storeInfo.avgStar.toFixed(1)}</span>
                    <span id="small">평점</span>
                </div>
            </Header>

            <div className="col-container">
                <div>
                    <Label path="storeImg" style={{ "color": "#46A6FF" }}>사진 <span id="side">{"총 " + storeImgArr.length + "장"}</span></Label>
                    <Grid isFeed={false}>
                        {storeImgArr.map((img: img) => <div className="container"><ImgModal src={img.imageUrl} width="100%" /></div>)}
                    </Grid>
                </div>
            </div>
            <Nav />
        </div>
    </>)
}
export default StoreImg;