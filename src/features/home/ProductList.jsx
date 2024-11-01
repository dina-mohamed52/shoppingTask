import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import useProducts from "./useProductList";
import { Tooltip } from 'react-tooltip'; 
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import LoadingSpinner from "../../ui/LoadingSpinner";

function ProductList() {
    const { data: products, isError, isLoading } = useProducts();
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    // Loading and error states
    if (isLoading) return <h1 className="text-center"><LoadingSpinner /></h1>;
    if (isError) return <h1 className="text-center text-red-500">Error</h1>;

    return (
        <div className="container  mx-auto px-6 py-8 w-[95%] rounded-lg mt-12 mb-4 shadow-xl">
            {/* Product Grid */}
            <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white border border-purple-300 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                        {/* <Link to={`/product/${product.id}`}> */}
                            <img src={product.img} alt={product.title} className="w-full mt-4 h-56 object-contain" />
                        {/* </Link> */}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
                            <div className="relative flex items-center justify-between mt-2">
                                <p className="text-lg font-bold text-gray-700">{product.price} EGP</p>
                                <Tooltip
                                    anchorId={`${product.id}`} 
                                    content="Add to Cart"
                                />
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    id={`${product.id}`} 
                                    className="mt-2 p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition duration-300"
                                >
                                    <BiCartAdd size={23} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
