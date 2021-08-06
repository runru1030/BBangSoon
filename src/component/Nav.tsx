import * as React from 'react';
import { useHistory } from 'react-router-dom';

const Nav = () => {
    const history = useHistory();
    const onClickSurr = () => {
        history.push("/surrounding");
    }
    const onClickHome = () => {
        history.push("/");
    }
    const onClickMy = () => {
        history.push("/surrounding");
    }
    return (
        <div className="nav">
            <div>
                <span id="surrounding" onClick={onClickSurr}>내 주변</span>
            </div>
            <div>
                <span id="home" onClick={onClickHome}>홈</span>
            </div>
            <div>
                <span id="mypage">마이페이지</span>
            </div>
        </div>
    )

}

export default Nav;