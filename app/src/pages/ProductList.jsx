import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Announcement } from '../components/Announcement'
import Navbar from '../components/Navbar'
import { Products } from '../components/Products'
import { Footer } from '../components/Footer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    margin-top: 10px;
    font-size: 22px;
    margin-left: 20px;
`;  

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 20px 0px 20px;
`;

const Filter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:5px;
`;

const FilterText = styled.h4`
`;

const ButtonWraper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 20px;
`;

const Button = styled.button`
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: white;
    cursor: pointer;
    transition: all 1s ease;

    &:hover{
        background-color: #f8f4f4;
    }
`;

const Select = styled.select`
    border: 1px solid lightgray;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
`;

const Option = styled.option`
`;


export const ProductList = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const category = pathArray[pathArray.length - 1];
  const [filters, setFilters] = useState({"size":"","sort":"newest"})
  const filtersHandler = (event) =>{
    setFilters((prevFilter) => {
      return {...prevFilter, [event.target.name]: event.target.value}
    })
  }

  return (
    <Container>
        <Title>
            {category.charAt(0).toUpperCase() + category.slice(1)}
        </Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select value={filters.size} name="size" onChange={filtersHandler}>
                    <Option value="" disabled>
                        Size
                    </Option>
                    <Option value="XS">XS</Option>
                    <Option value="S">S</Option>
                    <Option value="M">M</Option>
                    <Option value="L">L</Option>
                    <Option value="XL">XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select value={filters.sort} name="sort" onChange={filtersHandler}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <ButtonWraper>
            <Button onClick={(e)=>setFilters(prevFilter=> ({...prevFilter, "size":"","sort":"newest"}))}>Clear Filter</Button>
        </ButtonWraper>
        <Products category={category} filters={filters} />
    </Container>
  )
}
