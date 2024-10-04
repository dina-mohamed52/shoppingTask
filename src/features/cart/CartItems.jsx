import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./cartSlice";

function CartItems() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    
    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleIncrease = (item) => {
        dispatch(addToCart(item));
    };

    return (
        <div className="flex-grow bg-white p-6 border border-neutral-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Shopping cart</h3>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-4"
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 object-contain mb-4 sm:mb-0"
                            />
                            
                            {/* Product Details */}
                            <div className="flex-1 text-center sm:text-left ml-0 sm:ml-4">
                                <h4 className="text-lg font-semibold text-gray-700">
                                    {item.title}
                                </h4>
                                <p className="text-gray-500">Price: ${item.price}</p>
                            </div>
                            
                            {/* Quantity and Controls */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="bg-gray-200 text-gray-700 py-1 px-3 rounded-l-lg hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <p className="px-3 min-w-12 text-center">{item.quantity}</p>
                                    <button
                                        onClick={() => handleIncrease(item)}
                                        className="bg-gray-200 text-gray-700 py-1 px-3 rounded-r-lg hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CartItems;
