import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../features/cart/cartSlice';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  // Calculate total price by iterating over cartItems
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Cart Items */}
        <div className="flex-grow bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Shopping cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />
                  <div className="flex-1 ml-4">
                    <h4 className="text-lg font-semibold text-gray-700">{item.title}</h4>
                    <p className="text-gray-500">Price: ${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-gray-200 text-gray-700 py-1 px-3 rounded-l-lg hover:bg-gray-300"
                      >
                        -
                      </button>
                      <p className="px-3">{item.quantity}</p>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="bg-gray-200 text-gray-700 py-1 px-3 rounded-r-lg hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Cart Totals */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Cart totals</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <div>
                <label className="block">
                  <input type="radio" name="shipping" className=" checked:text-yellow-600 mr-2" />
                  Free shipping
                </label>
                <label className="block">
                  <input type="radio" name="shipping" className="mr-2" />
                  Flat rate: $10.00
                </label>
                <label className="block">
                  <input type="radio" name="shipping" className="mr-2" />
                  Pickup: $5.00
                </label>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
