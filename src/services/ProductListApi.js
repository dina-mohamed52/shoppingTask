export const fetchProductList = async (selectedCategory) => {
    const url = !selectedCategory || selectedCategory === "All"
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;
    const res = await fetch(url)
    const data = await res.json()
    // console.log('ddddddddddddd',data)
    return data
}