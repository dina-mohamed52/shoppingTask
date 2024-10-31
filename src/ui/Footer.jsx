import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();
    const currentDate = new Date().toLocaleDateString("en-US", {
        day: 'numeric',
        month: "long",
        year: "numeric"
    });

    const pageName = location.pathname === '/' 
        ? 'Home' 
        : location.pathname.replace('/', '').charAt(0).toUpperCase() + location.pathname.slice(1);

    return (
        <footer className="bg-gradient-to-r from-gray-800 to-pink-400 text-white p-4 text-center w-full mt-auto">
            <div className="container mx-auto max-w-screen-lg">
                <h2 className="text-2xl font-bold mb-1">Welcome to BabyStyle</h2>
                <p className="mb-4 text-md">{pageName} - Your one-stop shop for children's clothing!</p>
                <div className="flex justify-between flex-col md:flex-row mb-4">
                    <div className="mb-2 md:mb-0">
                        <h3 className="font-semibold text-lg">Contact Us</h3>
                        <p className="text-gray-300">01154864111</p>
                        <p className="text-gray-300">01001841284</p>
                    </div>
                    <div className="mb-2 md:mb-0">
                        <h3 className="font-semibold text-lg">Follow Us</h3>
                        <a href="https://www.facebook.com/BBYstyle22" className="text-gray-300 hover:text-pink-300">Facebook</a>
                        <p className="text-gray-300">Instagram</p>
                    </div>
                </div>
                <p className="text-sm text-gray-200">© {currentDate} - BabyStyle. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
