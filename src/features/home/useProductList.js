import { useQuery } from "@tanstack/react-query"
import { fetchProductList } from "../../services/ProductListApi"

const useProducts = (selectedCategory) => {

    return (

        useQuery({
            queryKey: ['products',selectedCategory],
            queryFn: ()=>fetchProductList(selectedCategory)
        })
    )

}

export default useProducts