import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../features/cart/cartSlice';
import { useLocation } from 'react-router-dom';
import api from '../api/api';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 70vh;
    margin: 40px 0px;
`;

const Wrapper = styled.div`
    padding: 10px;
    gap: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
`
const ImageContainer = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const InfoContainer = styled.div`
    width: 60%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;
const Title = styled.h1`
    font-size: 1.8rem;
`;

const Desc = styled.p``;

const Price = styled.span`
    font-size: 1.8rem;
`;
const FilterContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 15px;
    justify-content: flex-start;
    align-items: center;
`;
const Filter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
const FilterTitle = styled.label``;

const FilterSize = styled.select`
    border: 1px solid lightgray;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
`;
const FilterSizeOption = styled.option``;

const PurchaseContainer = styled.div`
    display: flex;
    width:100%;
    justify-content: space-between;
    align-items: center;
`;

const QuantityContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const Quantity = styled.span`
    width: 30px;
    height: 30px;
    display: flex;
    font-size: 1.2rem;
    align-items: center;
    justify-content: center;
    border-radius: 25%;
    border: 1px solid teal;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
    padding: 15px 20px;
    background-color: white;
    color: black;
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
    background-color: #1c1c1c;
    color: #f5fafd;
    }
`;

const IconContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const Product = () => {
   const dispatch = useDispatch()
   const [quantity, setQuantity] = useState(1)
   const [product, setProduct] = useState({})
   const [size, setSize] = useState("S")
   const location = useLocation();
   const locationArray = location.pathname.split("/")
   const itemID = locationArray[locationArray.length - 1]

   useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get(`/products/${itemID}`)
                console.log(response)
                setProduct(response.data.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    }, [itemID])

   return (
        <Container>
            {Object.keys(product).length > 0 ? (
                <Wrapper>
                    <ImageContainer>
                        <Image src={product.img} />
                    </ImageContainer>
                    <InfoContainer>
                        <Title>{product.title}</Title>
                        <Desc>
                            {product.desc}
                        </Desc>
                        <Price>{product.price.toLocaleString()} ฿</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterTitle htmlFor="sizes">Size</FilterTitle>
                                <FilterSize name='sizes' id='sizes' onChange={(e)=>setSize(e.target.value)}>
                                    {product.size.map((size) => (
                                        <FilterSizeOption key={size} value={size}>{size}</FilterSizeOption>
                                    ))}
                                </FilterSize>
                            </Filter>
                        </FilterContainer>
                        <PurchaseContainer>
                            <QuantityContainer>
                                <IconContainer onClick={()=>setQuantity(prevQuantity => (quantity > 0)?prevQuantity - 1:0)}>
                                    <RemoveCircleOutlineRoundedIcon />
                                </IconContainer>
                                    <Quantity>
                                        {quantity}
                                    </Quantity>
                                <IconContainer onClick={()=>setQuantity(prevQuantity => prevQuantity + 1)}>
                                    <AddCircleOutlineRoundedIcon />
                                </IconContainer>
                            </QuantityContainer>
                            <Button onClick={() => dispatch(addCartItem({...product, 
                                                                            "cartItemId":product._id+'-'+size,
                                                                            "size":size, 
                                                                            "quantity":quantity,
                                                                            "totalPrice":product.price*quantity}))}>
                                ADD TO CART
                            </Button>
                        </PurchaseContainer>
                    </InfoContainer>
                </Wrapper>) : (
                <h1>Loading...</h1>)
            }
        </Container>
   )
 }
 