import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import trCommon from '../locales/tr/common.json';
import { DEFAULT_LOCALE } from './locale';

void i18n.use(initReactI18next).init({
  resources: {
    tr: { common: trCommon },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: 'common',
  initAsync: false,
  interpolation: { escapeValue: false },
});

export default i18n;
