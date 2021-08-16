import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
type LocationProps = {
    location: {
        si: string,
        gu: string,
        dong: string,
        latitude: Number,
        longitude: Number,
        detail: string
    }
}
const Main: React.FC<LocationProps> = ({ location }) => {
    React.useEffect(() => {
        //서버 랭킹 store 리스트 get
    }, [location])
    return (
        <div>
            <Header><FontAwesomeIcon icon={faMapMarkerAlt} /> {location?.si}</Header>
            <div>
                <span>{location.gu}</span>

            </div>
            <Nav />
        </div>)
}
export default Main;

const Header=styled.header`
position: sticky;
padding: 10px 20px;
top: 0px;
border-bottom: solid thin #d0d0d0;
  color: #6f6f6f;
`