import { Link } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function Header() {
  const totalItems = useSelector((state) => state.cart.totalItems);

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-center items-center p-4 relative">
        {/* Logo */}
        {/* <RiShoppingBag3Fill
          size={50}
          className="text-yellow-400 drop-shadow-xl absolute left-4 transition-transform duration-300 hover:scale-110"
        /> */}

        {/* Centered Brand */}
        <Link
          to="/"
          className="text-3xl sm:text-4xl font-bold font-fantasy text-white relative z-10 transition-all duration-500 hover:scale-105"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-gradient-x">
            BabyStyle
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
