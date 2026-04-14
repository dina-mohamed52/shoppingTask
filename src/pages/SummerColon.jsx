import { HalfColoneData } from "../data/HalfColon";
import ProductBenefits from "../features/products/ProductBenifits";
import HeroBanner1 from "../features/SummerColon/HeroBanner1";
import SCHeroSec from "../features/SummerColon/SCHeroSec"
import SCProductList from "../features/SummerColon/SCProductList";
import Part1 from "../features/SummerHalf/Part1";


function SummerColon() {
 
    return (
        <div>
          <SCHeroSec/>
          <HeroBanner1/>
   <SCProductList/>
             <ProductBenefits />
        </div>
    )
}

export default SummerColon