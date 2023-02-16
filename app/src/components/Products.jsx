import { useEffect, useState } from 'react'
import styled from 'styled-components';
import api from '../api/api';
import { Product } from './Product';

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

export const Products = ({category='', filters={}}) => {
    const {size, sort} = filters
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const request = category ? `/products/category/${category}` : '/products'
            try{
                const response = await api.get(request)
                console.log(response)
                setProducts(response.data.data)
                setFilteredProducts(response.data.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    }
    , [category])
    // There are only few products in the database, so I sort them in the frontend
    useEffect(
        ()=>{
            if(sort){
                switch(sort){
                    case 'asc':
                        setFilteredProducts([...filteredProducts].sort((a,b)=>(a.price > b.price ? 1 : -1)))
                        break;
                    case 'desc':
                        setFilteredProducts([...filteredProducts].sort((a,b)=>(a.price < b.price ? 1 : -1)))
                        break;
                    default:
                        setFilteredProducts([...filteredProducts].sort((a,b)=>(a.createdAt < b.createdAt ? 1 : -1)))
                }
            }
        }
   , [sort] )

    useEffect(
        ()=>{
            if(size){
                const sizeFilteredProducts = [...products].filter(item=>(
                    item.size.indexOf(size) >= 0
                ))
                setFilteredProducts(sizeFilteredProducts)
            }else{
                setFilteredProducts([...products])
            }
        }
    , [size] )
    return (
        <ProductsContainer>
            {filteredProducts.map(item => (
                <Product item={item} key={item._id.toString()} />
            ))}
        </ProductsContainer>
    )
}
