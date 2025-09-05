import { useTranslation } from "react-i18next";

function Header1st() {
  const { t } = useTranslation();

  return (
    <div className="w-full mx-auto text-center text-gray-800 p-8 sm:p-8 rounded-full shadow-lg border border-gray-300">
      <h1 className="sm:text-4xl text-lg font-extrabold text-yellow-500 mb-4 tracking-wide">
        {t("header.title")}
      </h1>

      <p className="sm:text-xl text-base mb-4 font-bold leading-relaxed">
        {t("header.desc1")}{" "}
        <span className="text-yellow-500 font-bold">{t("header.highlight")}</span>{" "}
        {t("header.desc2")}
      </p>

      <p className="sm:text-xl text-base font-bold leading-relaxed">
        {t("header.desc3")}
      </p>
    </div>
  );
}
export default Header1st;