import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from './content/site';
import { HomePage } from './pages/Home/HomePage';

export function App() {
  const { t, i18n } = useTranslation();

  // Belge dili, başlığı ve açıklaması aktif dile göre güncellenir.
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t('meta.title', { brand: SITE.brand });
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t('meta.description', { brand: SITE.brand, email: SITE.email }));
  }, [t, i18n.language]);

  return <HomePage />;
}
