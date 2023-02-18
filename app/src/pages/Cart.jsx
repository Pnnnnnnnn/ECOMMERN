import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem, increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
  width: 100vw;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;

`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  @media only screen and (max-width: 992px) {
    padding: 0px;
  }
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props)=>props.type === "filled"?"white":"black"};

  @media only screen and (max-width: 992px) {
    font-size: 0.8rem;
    padding: 5px;
  }

`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
  @media only screen and (max-width: 992px) {
    flex: 1;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff8f8;
  height: 200px;
  margin: 10px 0px 10px 0px;
`;

const CartItemDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-left: 10px;
`;

const Image = styled.img`
  align-self: center;
  width: 180px;
  height: 180px;

  @media only screen and (max-width: 992px) {
      width: 100px;
      height: 100px;
  }
`;

const Details = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CartItemName = styled.h5`
  font-size: 16px;
  
  @media only screen and (max-width: 992px) {
      font-size: 0.8rem;
  }
`;

const DeleteWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  cursor: pointer;
`;

const DeleteText = styled.span`
  font-size: 16px;
  line-height: 20px;
  text-decoration: underline;

  @media only screen and (max-width: 992px) {
      font-size: 0.8rem;
  }
`;

const CartItemSize = styled.span`
  @media only screen and (max-width: 992px) {
      font-size: 0.8rem;
  }
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const CartItemAmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RemoveIcon = styled(RemoveCircleOutlineRoundedIcon)`
  cursor: pointer;
`;

const AddIcon = styled(AddCircleOutlineRoundedIcon)`
  cursor: pointer;
`;

const CartItemAmount = styled.div`
  font-size: 24px;

  @media only screen and (max-width: 992px) {
      font-size: 1rem;
  }
`;

const CartItemPrice = styled.div`
  font-size: 20px;
  font-weight: 200;

  @media only screen and (max-width: 992px) {
      font-size: 1.2rem;
  }
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const total = useSelector((state) => state.cart.total)
  const handleAmountChange = (operation, cartItem) => {
    if (operation === "increase") {
      dispatch(increaseQuantity(cartItem))
    } else {
      dispatch(decreaseQuantity(cartItem))
    }
  }

  return (
    <Wrapper>
      <Title>YOUR CART</Title>
      <Top>
        <TopButton type="unfilled" onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
        <TopText>Shopping Bag({cartItems.length})</TopText>
        <TopButton type="filled">CHECKOUT NOW</TopButton>
      </Top>
      <Bottom>
        <Info>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.cartItemId}>
              <CartItemDetail>
                <Image src={cartItem.img} />
                <Details>
                  <CartItemName>
                    {cartItem.title}
                  </CartItemName>
                  <DeleteWrapper onClick={() => dispatch(removeCartItem(cartItem))}>
                    <DeleteOutlineOutlinedIcon />
                    <DeleteText>Remove</DeleteText>
                  </DeleteWrapper>
                  <CartItemSize>
                    <b>Size:</b> {cartItem.size}
                  </CartItemSize>
                </Details>
              </CartItemDetail>
              <PriceDetail>
                <CartItemAmountContainer>
                  <AddIcon onClick={() => handleAmountChange("increase", cartItem)} />
                  <CartItemAmount>{cartItem.quantity}</CartItemAmount>
                  <RemoveIcon onClick={() => handleAmountChange("decrease", cartItem)} />
                </CartItemAmountContainer>
                <CartItemPrice>฿ {cartItem.totalPrice}</CartItemPrice>
              </PriceDetail>
            </CartItem>
          )
          )}
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>฿ {total}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>฿ 0.00</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>฿ {total}</SummaryItemPrice>
          </SummaryItem>
          <Button>CHECKOUT NOW</Button>
        </Summary>
      </Bottom>
    </Wrapper>
  );
};