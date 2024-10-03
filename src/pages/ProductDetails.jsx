import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../features/productDetails/useProduct";

function ProductDetails() {
    const { id } = useParams();
    const { data: product, isLoading, isError, isFetching } = useProduct(id);
const navigate=useNavigate();
    
    if (isLoading || isFetching) return <div>Loading...</div>;

 
    if (isError) return <div>Error loading product details</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full lg:w-1/2">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-2xl lg:text-3xl text-[#262626] font-bold mb-4">{product.title}</h1>
                    <div className="flex justify-center lg:justify-start items-center mb-4">
                        <span className="text-2xl font-bold text-green-600">
                            ${product.price}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">{product.description}</p>
                    <p className="text-sm font-semibold text-gray-500 mb-4 capitalize">
                        Category: {product.category}
                    </p>

                    {/* Rating */}
                    <div className="flex justify-center lg:justify-start items-center mb-4">
                        <span className="text-yellow-500 font-bold">{product.rating.rate}</span>
                        <span className="ml-2 text-gray-500">({product.rating.count} reviews)</span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-4" >

                    <button className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-6 rounded-md mt-4">
                        Add to Cart
                    </button>
                    <button
                    onClick={() => navigate('/')}
                     className="bg-transparent text-neutral-700 border border-neutral-700 hover:bg-neutral-600 hover:text-white py-2 px-6 rounded-md mt-4">
                        back to list
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
