import React, {  EventHandler, useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
const ImgModal :React.FC<any>=({src, width, height})=> {
  const wrapperRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen]=useState(false);
  const onClick=()=>{
      console.log("클릭");
      
      setIsOpen(true);
  }
  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);

    return()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }

  })
  const handleClickOutside=(event:any)=>{
    if (wrapperRef && !wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
    }
    else {
        setIsOpen(true);
        
    }
  }
 
    return (<>
    <img src={src} onClick={onClick} width={width} height={height} className="img"/>
    {isOpen&&
    <Modal>
        
    <img ref={wrapperRef} src={src}/>
    </Modal>}</>);
    }
export default ImgModal;
const Modal=styled.div`
z-index: 9999;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background-color: #00000054;
display: flex;
justify-content: center;
align-items: center;
img{
    width: 90%;
    object-fit: contain;
}
`