import i18n from 'i18n';
import path from 'path';
import { TranslationService } from '../translations/translation-service';

i18n.configure({
    locales: ['fr'],
    defaultLocale: 'fr',
    queryParameter: 'lang',
    directory: __dirname + '/locales',
    api: {
        '__': 'translate',
        '__n': 'translateN'
    },
});
export const transService  = new TranslationService(i18n);