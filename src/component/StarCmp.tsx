import { faBreadSlice } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
interface props {
    reviewStar: number;
}
const StarCmp: React.FC<props> = ({ reviewStar }) => {
    return (<Star>
        <span id="star">
            {Array.from({ length: 5 }, (v, i) => i).map((it) => <FontAwesomeIcon icon={faBreadSlice} color={reviewStar >= (it + 1) ? "#e2c26e" : "#cabfa3"} />)}
        </span>
        <span id="text">{reviewStar}점</span>
    </Star>)
}
export default StarCmp;
export const Star = styled.div`
background-color: #f3ecdc;
    padding: 5px 10px;
    border-radius: 5px;
    #text{
    font-weight: lighter;
    font-size: small;
    margin-left: 5px;
}
`
