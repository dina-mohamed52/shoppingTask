import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import useProducts from "./useProductList";
import { Tooltip } from 'react-tooltip'; 
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import Filters from "./Filters";
import LoadingSpinner from "../../ui/LoadingSpinner";

function ProductList() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("Default");
    const { data: products, isError, isLoading } = useProducts(selectedCategory);

    const dispatch = useDispatch();

    // Handle sorting 
    const sortedProducts = [...(products || [])].sort((a, b) => {
        if (sortOrder === "Price: Low to High") {
            return a.price - b.price;
        } else if (sortOrder === "Price: High to Low") {
            return b.price - a.price;
        }
        return 0; 
    });

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    // Loading and error states
    if (isLoading) return <h1 className="text-center"> <LoadingSpinner/></h1>;
    if (isError) return <h1 className="text-center text-red-500">Error</h1>;

    return (
        <div className="container mx-auto px-6 py-8 bg-white w-[95%] rounded-lg mt-12 mb-4">
            {/* Category and Sorting Dropdowns */}
            <Filters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-neutral-100 rounded-lg shadow-yellow-100 shadow-md overflow-hidden transition-transform transform hover:scale-105">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} className="w-full mt-4 h-52 object-contain" />
                        </Link>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
                            <div className="relative flex items-center justify-between mt-2">
                                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                <Tooltip
                                    anchorId={`${product.id}`} 
                                    content="Add to Cart"
                                />
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    id={`${product.id}`} 
                                    className="mt-2 p-4 rounded-full bg-yellow-600 py-4 text-white hover:bg-yellow-700 transition duration-300"
                                >
                                    <BiCartAdd size={18} />
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
