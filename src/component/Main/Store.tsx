import * as React from 'react';
import styled from 'styled-components';
import StoreList from '../StoreList';
import { resultState } from '../../routes/Main';

interface props {
    resultArr:resultState[], 
    curpage :number, 
    isEnd:boolean | undefined,
    getStoreKakao: Function
  }
const Store: React.FC<props> = ({resultArr, curpage, isEnd, getStoreKakao}) => {
    /* search */
    const onClickNext = () => {
        getStoreKakao(curpage);
    }

    return (
        <Wrapper>
            {resultArr.map((result: resultState) => <StoreList store={result} />)}
            {!isEnd && <Button onClick={onClickNext}>더 보기</Button>}
        </Wrapper>
    )
}
export default Store;
const Wrapper = styled.div`
    width: 100%;
    margin-right:0;
    margin-bottom: 100px;
`
const Button = styled.button`
    align-items: center;
    width: 100%;
    text-align: center;
    flex: 1;
    border-top: ${props => `solid thin` + props.theme.color.border_grey};
    padding: 10px 0;
    font-size: small;
`