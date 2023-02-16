import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: teal;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 25%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const Input = styled.input`
    min-width: 40%;
    margin: 8px auto;
    padding: 10px;
`;

const Button = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: auto;
`;
const Link = styled.a`
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    margin: auto;
`;

export const Login = () => {
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" />
                    <Input placeholder="password" />
                    <Button>LOGIN</Button>
                    <Link>FORGET PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>

    )
}
