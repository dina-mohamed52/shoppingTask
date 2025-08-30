import Offers from "../features/home/Offers";
import ProductList from "../features/home/ProductList";
import CustomCarousel from "../ui/CustomCarousel";
import Header1st from "../ui/Header1st";
import OrderForm from "../ui/Orderform";
function Home() {
  return (
    <>
      <div className="container mx-auto px-4 mt-4 ">
        <CustomCarousel />
        <div className=" text-yellow-400  p-4 mt-16 ">
          <Header1st/>
          <Offers />
        </div>
      </div>
      <div>
        <ProductList />
      </div>
      <div className="bg-gray-900 py-8">
        <OrderForm />
      </div>
    </>
  );
}
export default Home;
