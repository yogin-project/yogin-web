import { Language } from "@/app/types/common";
import i18next from "i18next";

export const handleChangeLang = (language: Language) => {
  i18next.changeLanguage(language);
};

export const toggleLanguage = () => {
  const currentLang = i18next.language;
  handleChangeLang(currentLang === "ko" ? "en" : "ko");
};
