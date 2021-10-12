import styled from "styled-components";

const Loding: React.FC = () => {
    return (<>
        <LodingView>
            <span>
                빵순이를 위한 빵지순례 도우미 웹앱
            </span>
            <img src="logo.png" width="60%" />
            <span id="copyright">&copy; 2021 . keeper . all right reserved</span>
        </LodingView>
    </>)
}
export default Loding;
const LodingView = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 150px;
span{
    font-weight: lighter;
    margin-bottom: 80px;
    font-size: large;
}
#copyright{
    position: absolute;
    font-size: small;
    bottom: 50px;
}
`