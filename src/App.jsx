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

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AppLayOut />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderForm" element={<OrderForm />} />
            <Route path="/Turbon" element={<Turbon />} />
            <Route path="/Offers" element={<Offers />} />

            {/* <Route path="/orderCollection" element={<OrderCollection/>}/> */}
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
