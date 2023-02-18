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
        height: '455px',
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
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 200px;
    height: 30px;
    padding: 5px;
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
    margin-top: 20px;
    outline: none;
`;

export const RegisterModal = ({ isOpen, setIsOpen }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const signInHandler = async (e) => {
        e.preventDefault()
        if (isSubmitting) return
        setIsSubmitting(true)

        if (!username || !email || !password || !confirmPassword) {
            console.log('Please complete the form')
            toast.error('Please complete the form')
            setIsSubmitting(false)
            return
        }
        if (password !== confirmPassword) {
            console.log('Passwords do not match')
            toast.error('Passwords do not match')
            setIsSubmitting(false)
            return
        }

        try {
            const res = await api.post('/auth/register', {
                username,
                email,
                password
            })
            console.log(res)
            toast.success('User created successfully')
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
            contentLabel="Register Modal"
            style={modalStyles}
        >
            <Container>
                <Top>
                    <Title>Register</Title>
                    <CloseIcon onClick={() => setIsOpen(false)} />
                </Top>
                <Form onSubmit={signInHandler}>
                    <InputContainer>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                    </InputContainer>

                    <InputContainer>
                        <Label htmlFor="email">Email</Label>
                        <Input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </InputContainer>

                    <InputContainer>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </InputContainer>

                    <InputContainer>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </InputContainer>

                    <Button type="submit" disable={isSubmitting}>Send</Button>
                </Form>
            </Container>
        </Modal>
    )
}