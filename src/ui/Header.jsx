import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function Header() {
  const totalItems = useSelector((state) => state.cart.totalItems);

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <RiShoppingBag3Fill
            fill="#FFD43B"
            size={32}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="sm:text-2xl text-xl font-bold sm:ml-2 font-fantasy text-white group-hover:text-yellow-400 transition-colors">
            BabyStyle
          </span>
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 flex items-center mr-[1rem]">
          <Link
            to="/"
            className="text-gray-200 hover:text-yellow-400 transition duration-300"
          >
            المنتجات
          </Link>

          <Link
            to="/cart"
            className="flex items-center text-gray-200 hover:text-yellow-400 transition duration-300"
          >
            <Badge
              count={totalItems}
              className="mr-2"
              style={{ backgroundColor: '#FFD43B', color: '#000' }}
            >
              <ShoppingCartOutlined className="text-2xl text-white" />
            </Badge>
            السلة
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
