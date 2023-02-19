import React from 'react'
import { appName, firstAppDesciption, secondAppDesciption } from '../data';
import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;
const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 3px;
    color: white;
    background-color: #${props => props.color};
    cursor: pointer;
`;  

const Container = styled.footer`
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    gap: 15px;
    background-color: #161616;
    text-align: center;
    margin-top: 20px;
`;
const Logo = styled.h1`
    font-weight: bold;
    font-style: italic;
    letter-spacing: -1px;
    color: white;
`
const Description = styled.p`
    color: white;
`;
export const Footer = () => {
  return (
    <Container>
        <Logo>{appName}</Logo>
        <Description>{firstAppDesciption}</Description>
        <Description>{secondAppDesciption}</Description>
        <IconWrapper>
            <Icon color="3B5999">
                <FacebookIcon />
            </Icon>
            <Icon color="E4405F">
                <InstagramIcon />
            </Icon>
            <Icon color="55ACEE">
                <TwitterIcon />
            </Icon>
            <Icon color="E4405F">
                <YouTubeIcon />
            </Icon>
        </IconWrapper>
    </Container>
  )
}
