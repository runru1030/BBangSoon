import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
import ImgModal from './ImgModal';
import { useHistory } from 'react-router-dom';
const Grid: React.FC<any> =({imgArr}) => {
  const history=useHistory();
  const onClick=()=>{
    history.push("/store/image");
  }
    useEffect(()=>{

        console.log(imgArr);
    })
  return (
    <>
      <div className="grid-wrapper" >
        {imgArr.length == 1 &&
          <div className="single-grid-container">
            <ImgModal src={imgArr[0].url} width="100%"/>
          </div>
        }
        {imgArr.length == 2 &&
          <div className="grid-container">
            {imgArr.map((it:any) => <div><ImgModal src={it.url} height="100%"/></div>)}
          </div>
        }
        {imgArr.length == 3 &&
          <div className="grid-container">
            {imgArr.map((it:any, index:number) => {
              if (index == 0) return <div className="item1">
              <ImgModal src={it.url} height="100%"/></div>
              if (index == 2) return <div onClick={onClick}>
                      <span>더보기</span>
                      <img className="plus-img" height="100%" src={it.url} />
                    </div>
              else return <div><ImgModal src={it.url} height="100%"/></div>
            })}

          </div>}
      </div>
    </>
  )
}
export default Grid;