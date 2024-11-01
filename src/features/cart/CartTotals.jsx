import React from 'react';

function CartTotals({ totalPrice, shippingCost, handleShippingChange, cartItems }) {
    // Calculate the total number of items in the cart
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        if (totalItems < 2) {
            alert("يجب عليك طلب قطعتين على الأقل."); // Alert in Arabic
        } else {
            // Proceed with checkout logic here
            console.log("Proceeding to checkout...");
            // You can add the redirect to the checkout page or any further logic needed
        }
    };

    return (
        <div className="w-full lg:w-1/3 bg-white p-6 h-fit rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Cart totals</h3>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-semibold">EGP {totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <div>
                        <label className="block">
                            <input
                                type="radio"
                                name="shipping"
                                className="mr-2"
                                onChange={() => handleShippingChange(0)}
                            />
                            Free shipping
                        </label>
                    </div>
                </div>
                <div className="flex justify-between gap-2 font-semibold text-lg">
                    <p>Total</p>
                    <p>EGP {(totalPrice + shippingCost).toFixed(2)}</p>
                </div>
                <button 
                    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
                    onClick={handleCheckout} // Trigger checkout
                >
                    Proceed to checkout
                </button>
            </div>
        </div>
    );
}

export default CartTotals;
