import React from 'react'
import styled from 'styled-components';
import { CategoryItem } from './CategoryItem';
import { categories } from '../data';

const Container = styled.div`
    display: flex;
`;

export const Categories = () => {
  return (
    <Container>
        {categories.map(item => (
            <CategoryItem item={item} key={item.id} />
        ))}
    </Container>
  )
}
