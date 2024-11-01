import { useQuery } from "@tanstack/react-query";
import { fetchProductList } from "../../services/ProductListApi";

const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProductList
    });
};

export default useProducts;
