/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-var-requires */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import configuration from 'config';

// Config
const { reactAppLanguage, fallbackLanguage } = configuration();

// Languages
const en = require('./locales/en.json');
const no = require('./locales/no.json');
const da = require('./locales/da.json');
const sw = require('./locales/sw.json');

const resources = {
  en: {
    translation: en,
  },
  no: {
    translation: no,
  },
  sw: {
    translation: sw,
  },
  da: {
    translation: da,
  },
};

const getLanguage = () => {
  let langugage = localStorage.getItem('i18nextLng');

  if (!langugage) {
    langugage = reactAppLanguage;
  }

  return langugage.toLowerCase();
};

i18next.use(initReactI18next).use(LanguageDetector).init({
  lng: getLanguage(),
  fallbackLng: fallbackLanguage,
  debug: false,
  resources,
});
