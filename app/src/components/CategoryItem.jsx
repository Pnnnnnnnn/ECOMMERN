import React from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const Container = styled.button`
    width: 33vw;
    height: 70vh;
    position: relative;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 1s ease;

    &:hover{
        opacity:0.7;
    }
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    opacity: 0.9;
    object-fit: cover;
`;
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 5px;
`;
const Title = styled.h1`
    font-size: 30px;
    color: #FAF9F6
`;

export const CategoryItem = ({item}) => {
  let navigate = useNavigate();

  return (
    <Container onClick={()=>navigate(`/products/category/${item.category}`)}>
        <Image src={item.img} />
        <InfoContainer>
            <Title>{item.title}</Title>
        </InfoContainer>
    </Container>
  )
}
