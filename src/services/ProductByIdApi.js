 export const ProductByIdApi=async(id)=>{
    const res=await fetch(`https://fakestoreapi.com/products/${id}`)
    const data=await res.json()
    return data
}