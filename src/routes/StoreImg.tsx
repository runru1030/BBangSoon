import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Nav from "../component/Nav";
import ImgModal from "../component/ImgModal";
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import HeaderCmp from "../component/Store/HeaderCmp";
import styled from "styled-components";
import { Grid } from "../component/Grid";
interface img {
    imageUrl: string
}
const StoreImg = () => {
    const storeInfo = useSelector((state: RootState) => state.store.storeObj);
    const [storeImgArr, setStoreImgArr] = useState<img[]>([]);

    useEffect(() => {
        axios.post(`/store/image/${storeInfo.id}`).then(res => {
            setStoreImgArr(res.data);
        });
    }, []);

    return (<>
        <Container>
            <HeaderCmp isStoreImg={true}/>
            <Wrapper className="col-container">
                <Wrapper>
                    <Label style={{ "color": "#46A6FF" }}>사진 <span id="side">{"총 " + storeImgArr.length + "장"}</span></Label>
                    <Grid>
                        {storeImgArr.map((img: img) => <div className="container"><ImgModal src={img.imageUrl} width="100%" /></div>)}
                    </Grid>
                </Wrapper>
            </Wrapper>
            <Nav />
        </Container>
    </>)
}
export default StoreImg;
const Container = styled.div``
const Wrapper = styled.div``
const Label = styled.div`
    font-size: medium;
    padding: 15px;
    display: flex;
    align-items: center;
    width: 90%;
    #side{
        text-align: end;
        font-size: xx-small;
        color: #6f6f6f;
        flex: 1;
    }
`