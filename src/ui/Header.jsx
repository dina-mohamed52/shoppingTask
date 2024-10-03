import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { RiShoppingBag3Fill } from 'react-icons/ri';

function Header({ cartItemCount }) {
    return (
        <header className="bg-[#525252] shadow-md text-white">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="flex items-center">
                <RiShoppingBag3Fill fill='#ca8a04'  size={30} />
                    <span className="text-2xl font-bold ml-2">Online Shop</span>
                </Link>
                <nav className="space-x-6 flex items-center mr-[2rem] ">
                    <Link to="/" className="hover:text-gray-300 transition duration-200">
                        Products
                    </Link>
                    <Link to="/cart" className="flex items-center hover:text-gray-300 transition duration-200">
                        <Badge count={cartItemCount} className="  mr-2">
                            <ShoppingCartOutlined  className="text-white text-2xl" />
                        </Badge>
                        Cart
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
