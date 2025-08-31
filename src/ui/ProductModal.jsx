import { Modal } from "antd";
import { useState, useEffect } from "react";

function ProductModal({ product, open, OnClose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // كل مرة المنتج يتغير أو المودال يتفتح، خلي الصورة الافتراضية أول صورة
  useEffect(() => {
    if (product && product.previewImages?.length > 0) {
      setSelectedImage(product.previewImages[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={OnClose}
      centered
      width={900}
    >
      <div className="flex gap-4">
        {/* الصور الصغيرة (الشمال) */}
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] w-24 pr-2">
          {product.previewImages?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
              className={`w-full h-16 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                selectedImage === img
                  ? "border-yellow-500"
                  : "border-gray-200"
              }`}
            />
          ))}
        </div>

        {/* الصورة الكبيرة (اليمين) */}
        <div className="flex-1 flex justify-center items-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full max-h-[500px] object-contain rounded-2xl shadow-xl transition-transform duration-300"
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProductModal;
