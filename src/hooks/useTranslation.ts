'use client';

import { useMemo } from 'react';

import esTranslations from '../../locales/es/common.json';
import enTranslations from '../../locales/en/common.json';

const translations = {
  es: esTranslations,
  en: enTranslations,
};

export function useTranslation(namespace: string = 'common') {
  const locale = 'es';

  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split('.');
      let value: any = translations[locale as keyof typeof translations];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key "${key}" not found for locale "${locale}"`);
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    };
  }, [locale]);

  return { t };
}
