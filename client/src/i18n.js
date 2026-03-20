import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        profile: "Profile",
        change_password: "Change Password"
      }
    },
    ta: {
      translation: {
        profile: "சுயவிவரம்",
        change_password: "கடவுச்சொல் மாற்றம்"
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
});

export default i18n;