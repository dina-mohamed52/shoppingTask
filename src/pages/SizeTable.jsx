import T from "../assets/T.png";

function SizeTable({  alt = "جدول المقاسات", className = "w-full max-w-md mx-auto" }) {
  return (
    <div className="flex justify-center my-4 bg-gray-900 p-6 mb-20 py-12 rounded-xl shadow-xl shadow-yellow-200 
    border-2  border-yellow-200
    ">
      <img
        src={T}
        alt={alt}
        className={`${className} rounded-lg shadow-lg object-contain`}
      />
    </div>
  );
}

export default SizeTable;
