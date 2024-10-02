 export const fetchProductList = async () => {
    const res =await fetch('https://fakestoreapi.com/products')
    const data=await res.json()
    // console.log('ddddddddddddd',data)
    return data
}