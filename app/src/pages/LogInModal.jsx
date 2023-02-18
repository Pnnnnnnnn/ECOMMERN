import React from 'react'
import api from '../api/api'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { useState } from 'react';

import axios from 'axios'
import styled from 'styled-components';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '355px',
        padding: '20px',
        borderRadius: '10px'
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 55px;

    @media only screen and (max-width: 992px) {
        height: 30px;
    }
`;
const CloseIcon = styled(CloseRoundedIcon)`
    align-self: flex-start;
    cursor: pointer;
`;
const Title = styled.h1`
    justify-self: left;
    align-self: flex-end;
    margin-left: 50%;
    transform: translate(-50%, 0%);

    @media only screen and (max-width: 992px) {
        align-self: flex-start;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 5px;

    @media only screen and (max-width: 992px) {
        gap: 10px;
    }
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 200px;
    height: 30px;
    padding: 5px;
    
    @media only screen and (max-width: 992px) {
        width: 160px;
    }
`;
const Label = styled.label`
    margin-bottom: 3px;
`;
const Button = styled.button`
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-top: 35px;
    outline: none;
`;

export const LoginModal = ({ isOpen, setIsOpen }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const logInHandler = async (e) => {
        e.preventDefault()
        console.log(isSubmitting)
        if (isSubmitting) return
        setIsSubmitting(true)

        if (!username || !password) {
            console.log('Please complete the form')
            toast.error('Please complete the form')
            setIsSubmitting(false)
            return
        }

        try {
            const res = await api.post('/auth/login', {
                username,
                password
            })
            console.log(res)
            toast.success('Log in successfully')
            // Save token to local storage
            localStorage.setItem('token', res.data.token)
            // Save username to local storage to display in the navbar
            localStorage.setItem('username', username)
            setIsOpen(false)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const { response } = err
                const message = response.data.message
                toast.error(message || 'Something went wrong')
                setIsSubmitting(false)
                return
            }
            toast.error("Something went wrong")
        }
        setIsSubmitting(false)
    }

    return (
        <Modal isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Login Modal"
            style={modalStyles}
        >
            <Container>
                <Top>
                    <Title>Log In</Title>
                    <CloseIcon onClick={() => setIsOpen(false)} />
                </Top>
                <Form onSubmit={logInHandler}>
                    <InputContainer>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                    </InputContainer>

                    <InputContainer>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </InputContainer>

                    <Button type="submit" disable={isSubmitting}>Send</Button>
                </Form>
            </Container>
        </Modal>
    )
}