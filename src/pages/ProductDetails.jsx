import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../features/productDetails/useProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import Swal from "sweetalert2"; 
import "sweetalert2/dist/sweetalert2.min.css"; 
import LoadingSpinner from "../ui/LoadingSpinner";

function ProductDetails() {
    const { id } = useParams();
    const { data: product, isLoading, isError, isFetching } = useProduct(id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (isLoading || isFetching) return <LoadingSpinner/>;
    if (isError) return <div>Error loading product details</div>;

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

        // Trigger SweetAlert2 Success Notification
        Swal.fire({
            title: 'Added to Cart!',
            text: `${product.title} has been added to your cart.`,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
        });
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full lg:w-1/2">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full object-cover rounded-xl"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full lg:w-1/2 text-center lg:text-left ml-0 lg:ml-16 ">
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
                    <div className="flex flex-col sm:flex-row gap-9 justify-center lg:justify-start items-center mb-4" >
                        <button 
                            onClick={() => handleAddToCart(product)}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-6 capitalize rounded-md mt-4">
                            Add to Cart
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-transparent capitalize text-neutral-700 border border-neutral-700 hover:bg-neutral-600 hover:text-white py-2 px-6 rounded-md mt-4">
                            Back to list
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
