import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export const SUPPORTED_LANGS = {
  en: 'en',
  es: 'es'
};

type SupportedLangsStrings = keyof typeof SUPPORTED_LANGS;

export const defaultLang = SUPPORTED_LANGS.en;


// Factory for the TranslateModule
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

/**
 * Method to remove the country from the language (en-UK -> en)
 * @param language - The navigator language
 * @returns A translation json valid name
 */
export function formatLanguage(language: string): string {
  const lan = language.split('-')[0] as SupportedLangsStrings;

  return SUPPORTED_LANGS[lan] ? lan : defaultLang;
}
