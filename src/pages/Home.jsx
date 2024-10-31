import Offers from "../features/home/Offers"
import ProductList from "../features/home/ProductList"
import CustomCarousel from "../ui/CustomCarousel"
import Header from "../ui/Header"

function Home() {
    return (
      
                <>
      <div className="  container mx-auto px-4 mt-4">
         
            <CustomCarousel />
            <div className="offers" >

            <Offers/> 
            </div>
        </div>
        <ProductList/>
                </>
    )
}

export default Home