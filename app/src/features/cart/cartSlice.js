import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        total : 0
    },
    reducers: {
        addCartItem: (state, action) => {
            const itemIndex = state.cartItems.findIndex(CartItem => CartItem.cartItemId === action.payload.cartItemId)
            if (itemIndex === -1) {
                state.cartItems.push(action.payload)
                state.total += action.payload.totalPrice
            } else {
                state.cartItems[itemIndex].quantity += 1
                state.cartItems[itemIndex].totalPrice += action.payload.price
                state.total += action.payload.price
            }
        },
        removeCartItem: (state, action) =>{
            state.total -= action.payload.totalPrice
            state.cartItems = state.cartItems.filter(CartItem => CartItem.cartItemId !== action.payload.cartItemId)
        },
        decreaseQuantity: (state, action) => {
            state.total -= action.payload.price
            const itemIndex = state.cartItems.findIndex(CartItem => CartItem.cartItemId === action.payload.cartItemId)
            if(itemIndex != -1 && state.cartItems[itemIndex].quantity > 1){
                state.cartItems[itemIndex].quantity -= 1
                state.cartItems[itemIndex].totalPrice -= action.payload.price
            }else if(itemIndex != -1 && state.cartItems[itemIndex].quantity === 1){
                state.cartItems = state.cartItems.filter(CartItem => CartItem.cartItemId !== action.payload.cartItemId)
            }
        },
        increaseQuantity: (state, action) => {
            state.total += action.payload.price
            const itemIndex = state.cartItems.findIndex(CartItem => CartItem.cartItemId === action.payload.cartItemId)
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity += 1
                state.cartItems[itemIndex].totalPrice += action.payload.price
            }
        }
    }
})

export const { addCartItem, removeCartItem, decreaseQuantity, increaseQuantity} = cartSlice.actions
export default cartSlice.reducer