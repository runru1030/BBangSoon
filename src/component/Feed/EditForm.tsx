import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  setUserInfo } from '../../modules/user';
import { RootState } from '../../modules';


interface props{
    setEditNick:React.Dispatch<React.SetStateAction<boolean>>,
    onClickEditNick:React.MouseEventHandler<HTMLSpanElement>
}
const EditForm: React.FC<props> = ({setEditNick, onClickEditNick}) => {
    const dispatch = useDispatch();
    const { userObj } = useSelector((state: RootState) => ({ userObj: state.user.userObj, }));

    /* 닉네임 변경 */
    const [newNick, setNewNick] = useState({ nickName: "", valid: false, error: "" } as { nickName: string, valid: boolean, error: string });

    const onChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valNick = /\s/g;
        if (valNick.test(event.target.value)) {
            setNewNick({ nickName: event.target.value, valid: false, error: "사용 불가" });
        }
        else {
            setNewNick({ nickName: event.target.value, valid: true, error: "사용 가능" });
        }
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (newNick.nickName == "" || !newNick.valid) {
                throw new Error("조건을 확인 해주세요.");
            }
            axios.patch(`/user/nickName/${userObj.id}/${newNick.nickName}`).then((res) => {
                res.status == 200 && dispatch(setUserInfo({ ...userObj, nickName: newNick.nickName }));
                setEditNick(false);
                setNewNick({ nickName: "", valid: false, error: "" });
            });
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }

    return (
        <Container className="container" valid={newNick.valid}>
            <Wrapper className="col-container">
                <img src="bread.png" width="50px" />
                <span>닉네임 변경</span>
                <Form valid={newNick.valid} className="col-container" onSubmit={onSubmit}>
                    {<span id="valid">{newNick.error}</span>}
                    <input type="text" value={newNick.nickName} onChange={onChangeNick} placeholder={userObj.nickName + "(10자 이하, 공백불가)"} maxLength={10} />
                    <div className="row-container">
                        <input type="submit" value="수정" />
                        <span onClick={onClickEditNick} id="quit">취소</span>
                    </div>
                </Form>
            </Wrapper>
        </Container>
    )
}
export default EditForm;
const Wrapper = styled.div`
    margin-top: 200px;
    background-color: white;
    padding: 30px 50px;
    align-items: center;
    border-radius: 20px;
    border:solid thin ${props => props.theme.color.blue};
`
const Container = styled.div<{ valid: boolean }>`
    position: absolute;
    z-index: 99;
    background-color: #2b2b2b71;
    width: 100%;
    height: 100vh;
`
const Form = styled.form<{ valid: boolean }>`
    margin-top: 30px;
    align-items: center;
    input[type=text]{
        width: 100%;
        border:solid thin ${props => props.valid ? props.theme.color.blue : props.theme.color.red};
        border-radius: 5px;
        margin-bottom: 30px;
        padding: 10px 15px;
    }
    input[type=submit]{
        all: unset;
        color: #46A6FF;
    }
    >div{
        gap:20px;
    }
    #quit{
        color: grey;
    }
    #valid{
        color:${props => props.valid ? props.theme.color.blue : props.theme.color.red};
        font-size: small;
        margin-bottom: 20px;
    }
`

