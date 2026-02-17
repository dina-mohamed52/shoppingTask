import T from "../assets/T.png";
import { useTranslation } from "react-i18next";

function SizeTable({ alt = "جدول المقاسات", className = "w-full max-w-md mx-auto" }) {
  const { t } = useTranslation();

  return (
    <div className="my-4 px-4 sm:px-0">
      {/* الهيدر */}

      {/* الجدول */}
      <div className="flex flex-col items-center justify-center bg-gray-900 p-6 mb-16 rounded-xl shadow-xl shadow-yellow-200 border-2 border-yellow-200">
      <h2 className="text-center text-2xl sm:text-3xl  font-bold text-yellow-400 mb-6">
        {t("sizeTable.header")}
      </h2>
        <img
          src={T}
          alt={alt}
          className={`${className} rounded-lg shadow-lg object-contain`}
        />
      </div>
    </div>
  );
}

export default SizeTable;
