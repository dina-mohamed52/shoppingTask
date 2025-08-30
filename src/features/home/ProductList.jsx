import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../cart/cartSlice";
import { Data } from "../../data/Data";
import ProductCard from "../products/ProductCard";
import { useState } from "react";
import ProductModal from "../../ui/ProductModal";

function ProductList() {
//   const dispatch = useDispatch();
const [open, setOpen] = useState(false);
const [selectedProduct,setSelectedProduct] = useState(null);


  const handlePreview = (product) => {
  // هجمع كل الصور اللي في productColors
  const allUrls = product.productColors.map((c) => c.img);

  console.log("allUrls", allUrls);

  // هخزن البرودكت + الصور
  setSelectedProduct({
    ...product,
    previewImages: allUrls,
  });

  setOpen(true);
};


  return (
    <div className="container mx-auto px-6 py-10 w-[95%] mt-12 mb-6">
      <h1 className="sm:text-3xl text-xl font-bold text-center shadow-md p-4 rounded-full border border-gray-300 text-gray-800 mb-10 tracking-wide">
        ❄️ مغامرات دافئة تبدأ من هنا!
        <span className="block text-yellow-600 mt-2">
          اكتشفوا أجمل الكولونات الشتوية لأقدام صغيرة مليانة لعب ومرح!
        </span>
        <span className="block text-gray-700 text-lg mt-1">
          ألوان حيوية ✨، راحة تدوم، وجودة تخليهم مستعدين لأي مغامرة.
        </span>
      </h1>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPreview={handlePreview}
          />
        ))}

       {selectedProduct && (
  <ProductModal
      open={open}
    OnClose={() => setOpen(false)}
    product={selectedProduct}
  />
)}

      </div>

      {/* </div> */}
    </div>
  );
}

export default ProductList;
