import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalItems: 0,
}
const cartSlice= createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item=action.payload;
            const isItemExist=state.cartItems.find((i)=>i.id===item.id);
            if(isItemExist){
                isItemExist.quantity++;
            }else{
                state.cartItems.push({...item, quantity: 1})
            }
           state.totalItems+=1;
    },
        removeFromCart: (state, action) => {
            const id=action.payload;
            const item=state.cartItems.find((i)=>i.id===id);
            if(item.quantity>1){
                item.quantity--;
            }else{
                state.cartItems=state.cartItems.filter((i)=>i.id!==id)
            }
            state.totalItems-=1;
    },
        clearCart:(state)=>{
            state.cartItems=[]
            state.totalItems=0;
        }
    }
})
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;