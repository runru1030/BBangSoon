import * as React from 'react';
import Nav from '../component/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
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
            <header><FontAwesomeIcon icon={faMapMarkerAlt} />{location?.si}</header>
            <div>
                <span>랭킹 TOP5</span>

            </div>
            <Nav />
        </div>)
}
export default Main;