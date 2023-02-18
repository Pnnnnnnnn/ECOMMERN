import React from 'react'
import {useState} from 'react'
import styled from 'styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { sliderItems } from '../data';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    align-items: center;
    background-color: #f5fafd;
    width: 100vw;
    height: 70vh;
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: ${props => props.direction === "left" ? "10px":"auto"};
  right: ${props => props.direction === "right" ? "10px":"auto"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const SlideWrapper = styled.div`
  display: flex;
  height: 100%;
  transform: translateX(${props=>props.slideIndex * -100}vw);
  transition: all 1s ease;
`;
const Slide = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;
const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const numSlides = sliderItems.length;
export const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : numSlides - 1);
    } else {
      setSlideIndex(prevIndex => prevIndex < numSlides - 1 ? prevIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={()=>handleClick("left")}>
        <ArrowBackIosIcon />
      </Arrow>
      <SlideWrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => 
          <Slide bg={item.bg} key={(item.id).toString()}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
          </Slide>
          )}
      </SlideWrapper>
      <Arrow direction="right" onClick={()=>handleClick("right")}>
        <ArrowForwardIosIcon />
      </Arrow>
    </Container>
  )
}
