import React from 'react'
import { useState } from 'react';

import { useSelector } from "react-redux";
import { RegisterModal } from '../pages/RegisterModal';
import { LoginModal } from '../pages/LoginModal';

import {NavLink} from 'react-router-dom';
import styled from 'styled-components'
import { appName } from '../data';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 60px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`
const Nav = styled.nav`
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Left = styled.div`
`
const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    font-style: italic;
    letter-spacing: -1px;
`
const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
`
const MenuItem = styled(NavLink)`
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    color: black;
`

const ModalMenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    color: black;
` 

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: black;
`

const Navbar = () => {
    const numberOfCartItems = useSelector(state => state.cart.cartItems.length)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isLogInModalOpen, setIsLogInModalOpen] = useState(false)
    
    return (
        <Container>
            <Nav>
                <Left>
                    <MenuItem to="/">
                        <Logo>
                            {appName}
                        </Logo>
                    </MenuItem>
                </Left>
                <Right>
                    { (localStorage.getItem('username') === null)?(
                        <>
                        <ModalMenuItem onClick={()=>setIsRegisterModalOpen(true)}>
                            REGISTER
                        </ModalMenuItem>
                        <ModalMenuItem onClick={()=>setIsLogInModalOpen(true)}>
                            LOG IN
                        </ModalMenuItem>
                        </>):(
                            <UserContainer>
                                <AccountCircleRoundedIcon />
                                {localStorage.getItem('username')}
                            </UserContainer>
                    )}
                    <MenuItem to="/cart">
                        <Badge badgeContent={numberOfCartItems} color="primary">
                            <ShoppingCartOutlinedIcon/>
                        </Badge>
                    </MenuItem>
                </Right>
            </Nav>
            <RegisterModal isOpen={isRegisterModalOpen} setIsOpen={setIsRegisterModalOpen} />
            <LoginModal isOpen={isLogInModalOpen} setIsOpen={setIsLogInModalOpen} />
        </Container>
    )
}

export default Navbar