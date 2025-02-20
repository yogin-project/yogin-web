import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./app/locales/en.json";
import ko from "./app/locales/ko.json";

const resources = {
  en: { translation: en },
  ko: { translation: ko },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko", // 기본 언어
  fallbackLng: "en", // 설정되지 않은 언어일 경우 대체 언어
  interpolation: {
    escapeValue: false, // React에서는 XSS 방어가 기본적으로 적용됨
  },
});

export default i18n;
