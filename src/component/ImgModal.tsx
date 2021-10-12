import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
interface props {
  src: string,
  width?: string,
  height?: string
}
const ImgModal: React.FC<props> = ({ src, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(true);
  }
  /* img error 처리 func */
  const imgError = (event: React.MouseEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "logo.png";
    event.currentTarget.width = 60;
    event.currentTarget.height = 60;
  }

  const wrapperRef = useRef<HTMLImageElement>(null);
  /* 외부영역 클릭 감지 */
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef && !wrapperRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
    else {
      setIsOpen(true);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })

  return (<>
    <img src={src} style={{ "backgroundColor": "white" }} onError={imgError} onClick={onClick} width={width} height={height} className="img" />
    {isOpen && <Modal><img ref={wrapperRef} src={src} /></Modal>}</>);
}
export default ImgModal;

const Modal = styled.div`
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