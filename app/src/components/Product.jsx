import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 2px;
    height: 25rem;
    width: 20rem;
    margin: 10px;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const ImageWrapper = styled.button`
    width: 100%;
    height: 90%;
    border:none;
    background-color: transparent;
    cursor: pointer;
    transition: all 1s ease;

    &:hover{
        opacity: 0.5;
        scale: 1.1;
    }
`;


export const Product = ({item}) => {
  let productNavigate = useNavigate()
  
  return (
    <Container onClick={()=>productNavigate(`/product/${item._id}`)}>
        <ImageWrapper>
            <Image src={item.img} />
        </ImageWrapper>
        <h4>
            {item.title}
        </h4>
        <p>
            ฿{item.price.toLocaleString()}
        </p>
    </Container>
  )
}
