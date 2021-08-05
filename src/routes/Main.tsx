import * as React from 'react';
import Nav from '../component/Nav';

type LocationProps = {
    si : string
}
const Main :React.FC<LocationProps> =({si})=>{
    React.useEffect(()=>{
        //서버 랭킹 store 리스트 get
    },[si])
    return(
    <div>
        <header>{si}</header>
        <div>
            <span>랭킹 TOP5</span>

        </div>
        <Nav/>
    </div>)
}
export default Main;