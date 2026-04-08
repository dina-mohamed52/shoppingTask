import Part1 from "../features/SummerHalf/Part1"
import { HalfColoneData } from '../data/HalfColon';
import SproductList from "../features/SummerHalf/SproductList";

function SummerColon() {
  return (
    <div>
        <Part1
      HalfColoneData={HalfColoneData}
    
    />
    <SproductList/>
    </div>
  )
}

export default SummerColon