import * as english from '@assets/lang/english.json';
import * as hindi from '@assets/lang/hindi.json';
import * as kannada from '@assets/lang/kannada.json';
import i18n, {t} from 'i18n-js';
import memoize from 'lodash.memoize';
import * as RNLocalize from 'react-native-localize';

export default class LocaleService {
  private translationGetters = {
    english: () => english,
    hindi: () => hindi,
    kannada: () => kannada,
  };

  private mapTranslation = memoize((key: string, config: any) =>
    i18n.t(key, config),
  );

  public init = (): void => {
    const fallback = {languageTag: 'english'};
    const {languageTag} =
      RNLocalize.findBestAvailableLanguage(
        Object.keys(this.translationGetters),
      ) || fallback;

    // @ts-ignore
    this.mapTranslation.cache.clear();

    // @ts-ignore
    this.setLanguage(languageTag);
  };

  public setLanguage = (language: string): void => {
    // @ts-ignore
    i18n.translations = {[language]: this.translationGetters[language]()};
    i18n.locale = language;
  };

  public static t: any = t;
}

const localeService = new LocaleService();
export {localeService as LocalService};
