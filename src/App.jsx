import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./ui/AppLayOut";
import ProductDetails from "./pages/ProductDetails";


function App() {
  const queryClient= new QueryClient();
  return (
    <>
<QueryClientProvider client={queryClient}>
<Routes>
    <Route path="/" element={<AppLayOut/>}>
    <Route index element={<Home/>}/>
    <Route path="/product/:id"  element={<ProductDetails/>}/>
    </Route>
   
</Routes>
</QueryClientProvider>
    </>
  )
}

export default App
