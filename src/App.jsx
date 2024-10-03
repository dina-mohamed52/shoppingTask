import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./ui/AppLayOut";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";


function App() {
  const queryClient= new QueryClient();
  return (
    <>
<QueryClientProvider client={queryClient}>
<Routes>
    <Route path="/" element={<AppLayOut/>}>
    <Route index element={<Home/>}/>
    <Route path="/product/:id"  element={<ProductDetails/>}/>
    <Route path="/cart"  element={<Cart/>}/>
    </Route>
   
</Routes>
</QueryClientProvider>
    </>
  )
}

export default App
