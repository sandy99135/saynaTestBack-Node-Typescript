"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("i18n"));
const translation_service_1 = require("../translations/translation-service");
i18n_1.default.configure({
    locales: ['fr'],
    defaultLocale: 'fr',
    queryParameter: 'lang',
    directory: __dirname + '/locales',
    api: {
        '__': 'translate',
        '__n': 'translateN'
    },
});
exports.transService = new translation_service_1.TranslationService(i18n_1.default);
//# sourceMappingURL=locale-config.js.map