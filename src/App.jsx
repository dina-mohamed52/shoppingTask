import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./ui/AppLayOut";

import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderForm from "./ui/Orderform";

import Offers from "./features/home/Offers";
import Turbon from "./pages/Turbon";
import SummerHalfColon from "./pages/SummerHalfColon";
import SummerColon from "./pages/SummerColon";
import MainPage from "./pages/MainPage";
import ProductDetails from "./ui/ProductDetails";
import WhatsAppButton from "./ui/WhatsAppButton";
import CheckoutPage from "./pages/CheckoutPage";


function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AppLayOut />}>

            <Route index element={<MainPage />} />
            <Route path="/WinterCollection" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/orderForm" element={<OrderForm />} />
            <Route path="/Turbon" element={<Turbon />} />
            <Route path="/Offers" element={<Offers />} />
            <Route path="/SummerHalfColon" element={<SummerHalfColon />} />
            <Route path="/SummerColon" element={<SummerColon />} />
            <Route path="/Checkout" element={<CheckoutPage />} />


            {/* <Route path="/orderCollection" element={<OrderCollection/>}/> */}
          </Route>
        </Routes>
         <WhatsAppButton
        message="مرحبا، عايز أطلب منتجات من الموقع"
      />
      </QueryClientProvider>
    </>
  );
}

export default App;
