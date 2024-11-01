import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartItems from '../features/cart/CartItems';
import CartTotals from '../features/cart/CartTotals';

function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [shippingCost, setShippingCost] = useState(0);

    const handleShippingChange = (cost) => {
        setShippingCost(cost);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-8 min-h-screen w-[95%] rounded-xl shadow-md mt-8 bg-neutral-50 border border-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Section: Cart Items */}
                <CartItems />

                {/* Right Section: Cart Totals */}
                <CartTotals 
                    totalPrice={totalPrice} 
                    shippingCost={shippingCost} 
                    handleShippingChange={handleShippingChange} 
                    cartItems={cartItems} // Pass cartItems here
                />
            </div>
        </div>
    );
}

export default Cart;
