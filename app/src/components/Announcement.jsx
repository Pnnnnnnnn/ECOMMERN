import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    width: 100vw;
    background-color: #161616;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`
export const Announcement = () => {
  return (
    <div>
        <Container>
            Free Shipping on Orders Over 1,000฿
        </Container>
    </div>
  )
}
