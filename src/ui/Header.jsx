import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function Header() {
    const totalItems = useSelector((state) => state.cart.totalItems);
    
    return (
        <header className="bg-gradient-to-r from-purple-600 via-gray-600 to-pink-600 shadow-md text-white">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
                <Link to="/" className="flex items-center mb-2 sm:mb-0">
                    <RiShoppingBag3Fill fill='#fff' size={30} />
                    <span className="text-3xl font-bold ml-2 font-fantasy">BabyStyle</span>
                </Link>
                <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 mr-[2rem]">
                    <Link to="/" className="hover:text-gray-200 transition duration-200">
                        Products
                    </Link>
                    <Link to="/cart" className="flex items-center hover:text-gray-200 transition duration-200">
                        <Badge count={totalItems} className="mr-2">
                            <ShoppingCartOutlined className="text-white text-2xl" />
                        </Badge>
                        Cart
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
