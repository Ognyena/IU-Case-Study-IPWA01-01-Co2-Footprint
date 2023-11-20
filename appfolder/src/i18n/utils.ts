
//Astro Funktionen zur Internationalisierung:
import { ui, defaultLanguage } from "../i18n/ui";


// Funktion um Seitensprache basierend an der URL zu erkennen:
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLanguage;
}

  
// Funktion um Übersetzungen für Benutzeroberfläche abzurufen
export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLanguage]) {
      return ui[lang][key] || ui[defaultLanguage][key];
    }
  }