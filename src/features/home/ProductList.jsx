import { Data } from "../../data/Data";
import ProductCard from "../products/ProductCard";
import { useState } from "react";
import ProductModal from "../../ui/ProductModal";
import { useTranslation } from "react-i18next";

function ProductList() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handlePreview = (product) => {
    const allUrls = product.productColors.map((c) => c.img);

    setSelectedProduct({
      ...product,
      previewImages: allUrls,
    });

    setOpen(true);
  };

  return (
    <div className="container mx-auto sm:px-6 px-2 py-10  w-full mt-12 mb-6">
  <h1 className="sm:text-3xl text-xl font-bold text-center shadow-md sm:p-4 p-6 rounded-full border border-gray-300 text-gray-800 mb-10 tracking-wide">
    {t("productList.title")}
    <span className="block text-yellow-600 mt-2">
      {t("productList.subtitle")}
    </span>
    <span className="block text-gray-700 text-lg mt-1">
      {t("productList.description")}
    </span>
  </h1>

  {/* شبكة المنتجات */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
</div>

  );
}

export default ProductList;
