import { useQuery } from "@tanstack/react-query"
import { ProductByIdApi } from "../../services/ProductByIdApi"

function useProduct(id) {
    return (
       useQuery({
        queryKey: ['product'],
        queryFn:()=>ProductByIdApi(id),
       })
    )
}

export default useProduct