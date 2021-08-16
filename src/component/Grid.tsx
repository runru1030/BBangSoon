import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
const Grid: React.FC<any> =({imgArr}) => {
    useEffect(()=>{

        console.log(imgArr);
    })
  return (
    <>
      <div className="grid-wrapper" >
        {imgArr.length == 1 &&
          <div className="single-grid-container">
            <img width="100%" src={imgArr[0].url} />
          </div>
        }
        {imgArr.length == 2 &&
          <div className="grid-container">
            {imgArr.map((it:any) => <div><img height="100%" src={it.url} /></div>)}
          </div>
        }
        {imgArr.length == 3 &&
          <div className="grid-container">
            {imgArr.map((it:any, index:number) => {
              if (index == 0) return <div className="item1"><img  height="100%" src={it.url} /></div>
              else return <div><img height="100%" src={it.url} /></div>
            })}
          </div>}

      </div>
    </>
  )
}
export default Grid;