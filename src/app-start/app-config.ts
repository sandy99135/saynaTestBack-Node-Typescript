/*t { BotStatusEnum } from "../enums/bot-status.enum";
import { BotNameEnum } from "../enums/bot-name.enum";
import { BotAccessEnum } from "../enums/bot.access.enum";
import { logger } from "../services/logger.service";
require('dotenv').config()

// ==> !!!! IMPORTANT !!!!
const botAccess = BotAccessEnum.TO_ALL// access: ALL vs TEAM
//const botAccess = BotAccessEnum.TO_TEAM_ONLY // access: ALL vs TEAM

const botStatus = BotStatusEnum.DEV // DEV: server dev, PORD: server prod
const botName = BotNameEnum.MY_ACCES

const serverConfig = {
    //myaccesdev1.accesbanque.mg
    DEV: {
        port: 60066,
        host: "https://e853-154-126-61-242.ngrok.io",
        //   host: "https://myaccesdev1.accesbanque.mg",
        // apiMyAccèsHost: 'http://192.168.210.103:51943',
        apiMyAccèsHost: 'http://localhost:51943',
        // apiOnlineSubscriptionHost: 'http://192.168.210.103:60180'
        apiOnlineSubscriptionHost: 'http://192.168.124.83:59835'
    },
    PROD: {
        port: 60164,
        host: 'https://api.accesbanque.mg',

        apiMyAccèsHost: 'http://192.168.210.2:51943',
        apiOnlineSubscriptionHost: 'http://192.168.210.2:59836'
    }
}

const host = eval('serverConfig.{botStatus}.host'.replace('{botStatus}', botStatus));
const port = eval('serverConfig.{botStatus}.port'.replace('{botStatus}', botStatus));
const apiHost = eval('serverConfig.{botStatus}.apiMyAccèsHost'.replace('{botStatus}', botStatus));
const apiOnlineSubscriptionHost = eval('serverConfig.{botStatus}.apiOnlineSubscriptionHost'.replace('{botStatus}', botStatus));

const abmFbId = 'abm_fb_id'
const fbHost = 'https://graph.facebook.com/v5.0/me/messages'
const fbHostVersion = "https://graph.facebook.com/v5.0/"

const viberhost = "https://chatapi.viber.com/pa";

// webwies and public
const pinWebView = process.cwd() + "\\dist\\public\\pinpad.html"
const pinWebViewWeb = process.cwd() + "\\dist\\public\\pinpadweb.html"
const pinWebViewPostBack = process.cwd() + "\\dist\\public\\pinpadpostback.html"
const modeleFacture = process.cwd() + "\\dist\\public\\modele_facture_jirama.jpg"
const receiptDir = process.cwd() + "\\dist\\public\\receipts\\"
const faqTemplate = process.cwd() + "\\dist\\public\\faq.html"

export const AppConfig = {
    port: port,
    serverUrl: host,
    NOTIF_PAGE_ID: "100568432317781x",
    BOT_BASIC_TOKEN: "bXlhY2Nlc2JvdDpYeXQyMDIxOjAxUkVw",

    API_CLIENT_ID: "a2934fa2-6f7e-4ac9-8210-681814ac86c4",
    USER_ID: "MYACCES_BOT_V2",
    PASSWORD: "ABABtjrF2BxQZBI5oZAM3YFbAsKuR6R8fT",

    // !!!! IMPORTANT !!!! 
    BOT_ACCESS: botAccess,
    BOT_NAME: botName,
    VIBER_TOKEN: process.env.VIBER_TOKEN,
    VIBER_BOT_NAME: "MyaccesBt",
    MiddlwareRequestTimeout: 600000,

    getTokenUri: apiHost + '/api/user/token',

    fbTextMessageUrl: fbHost + '/',
    fbButtonMessageUrl: fbHost,
    fbGetInfosUrl: "https://graph.facebook.com/v5.0/",
    fbAttachmentMessageUrl: fbHost + '/',

    fbAccessToken: process.env.PAGE_ACCESS_TOKEN,
    fbAgencePartenaireAccessToken: process.env.NOTIF_PAGE_ACCESS_TOKEN,

    apiDetailsClientByFbIdUrl: apiHost + '/api/client/details',
    checkCutomerCodeUrl: apiHost + '/api/client/get/cust_code',
    apiRegisterNewCustomerUrl: apiHost + '/api/client/create',
    apiCheckBalancesUrl: apiHost + '/api/client/balance',
    apiGetListOfEligibleSenderAccountUrl: apiHost + '/api/virement/infos',

    apiValidateBankAccoutByBankName: apiHost + '/api/virement/validate_rib',
    apiGetListOfEligibleDestinationAccountUrl: apiHost + '/api/client/account/list',
    apiGetListOfDestinationBankUrl: apiHost + '/api/bank/list',
    apiRegisterNewTransferUrl: apiHost + '/api/virement',
    apiRegisterNewTransferDigitCodeUrl: apiHost + '/api/virement/digicode',
    apiGetListOfAllAccountUrl: apiHost + '/api/releve/accounts',
    apiGetMiniStatementByAccountUrl: apiHost + '/api/releve',
    apiRegisterNewBillUrl: apiHost + '/api/jirama/facture/new',
    apiInitPaymentNewBillUrl: apiHost + '/api/jirama/facture/initpaiement',
    apiGetReceiptUrl: apiHost + '/api/jirama/facture/receipt',
    apiGetListOfEligibleSenderAccountJiramaUrl: apiHost + '/api/jirama/facture/infos',
    apiUpdateClientPinForPinLostUrl: apiHost + '/api/client/reset_pin',
    apiCheckJiramaBillDetailsUrl: apiHost + '/api/jirama/facture/precheck',
    apiGetJiramaCodeSiteUrl: apiHost + '/api/jirama/facture/code_site',
    apiCheckDigitCodeUrl: apiHost + '/api/digitcode/infos',
    apiGetDigitByFbIdCodeUrl: apiHost + '/api/digitcode/details-digicode',
    apiRegisterAccesPayUrl: apiHost + '/api/virement/accesPay',
    apiGetDisponibleAmountAccesPayUrl: apiHost + '/api/digitcode/balance',

    apiCheckAgenceCredential: apiHost + '/api/partenaire/credential',

    // Cédric
    apiGetFavoriteListUrl: apiHost + '/api/favorite/liste',
    apiGetAliasDetailsUrl: apiHost + '/api/favorite/details',
    // Princy
    apiGetFavoriteListeUrl: apiHost + '/api/favorite/details',
    apiRegisterFavListUrl: apiHost + '/api/favorite/create',
    apiDeleteAliasFromFavoriteListUrl: apiHost + '/api/favorite/delete',

    // online subscription
    apiRegisterNewCustomerOnlineSubscription: apiOnlineSubscriptionHost + '/api/cust_registration_myacces/customer/create',
    apiGetCustomerStatusOnlineSubscription: apiOnlineSubscriptionHost + '/api/cust_registration_myacces/customer/status',
    apiValidateOtpAndRefContractOnlineSubscription: apiOnlineSubscriptionHost + '/api/cust_registration_myacces/customer/download',

    // A-Pay => open to client abm sprint
    apiGetClientAccesPayDebitableAccountStatusUrl: apiHost + '/api/digitcode/hasCompteDebit',
    apiGetListOfDebitableAccountAccesPayUrl: apiHost + '/api/virement/listCav/accesPay',
    apiRegisterAccountToDebitAccesPayUrl: apiHost + '/api/digitcode/newCompteDebit/Apay',
    apiCheckIsMyMbsOnlineUrl: apiHost + '/api/virement/isMyMbsOnline',

    pinWebView: pinWebView,
    pinWebViewWeb: pinWebViewWeb,
    pinWebViewPostBack: pinWebViewPostBack,

    modeleFactureJirama: modeleFacture,
    fbGetModeleFacture: host + "/get/template",
    fbGetReçu: host + "/get/facture_jirama",

    // images
    getImageUrl: host + "/image?id=",

    receiptDir: receiptDir,
    waitingTime: 1000, //seconds,

    // FAQ
    faqCurrentTemplate: faqTemplate,
    faqUrl: "/faq",

    //REactivate
    apiSendRequestReactivateClientUrl: apiHost + "/api/client/reactivate",

    //FLASH_LOAN
    apiGetCustomerEligibilityFlashLoanUrl: apiHost + "/api/flashloan/eligibility",
    apiGetListCavToDebitFlashLoanUrl: apiHost + "/api/flashloan/getList/cav",
    apiSendFlashLoanDemandeUrl: apiHost + "/api/flashloan/demande/credit",

    apiGetBalanceFlashLoanUrl: apiHost + "/api/flashloan/balance/repayment",
    apiPosteRepaymentFlashLoanUrl: apiHost + "/api/flashloan/repayment/amount",
    apiConfirmeLoanUrl: apiHost + "/api/flashloan/demande/confirm",


    //VIBER
    viberSendMessageUrl: viberhost + "/send_message",
    viberGetInfosUrl: viberhost + "/get_user_details",
    viberUrl: host + "/web",
    viberSecretQuestViewUrl:"/secretQuestionWebviewViber",
    viberSecretQuestPostBackUrl:"/secretQuestionWebviewpostbackViber",


    //VALIDATION CUSTOMER
    apiValidateCustomer: apiHost + "/api/client/validate_cust_code",

    //self activation
    apiActivateClientByFbIdUrl: apiHost + '/api/client/activate',
    apiAddSecretQuestionByFbIdUrl: apiHost + '/api/client/set_secret_question',
    apiUpdateSecretQuestionByFbIdUrl: apiHost + '/api/client/update_secret_question_withoutpin',
    apiCheckSecretQuestionByFbIdUrl: apiHost + '/api/client/check_secret_question',



}

logger.debug('++++ Bot Name   : ' + AppConfig.BOT_NAME);
logger.debug('++++ Bot Status : ' + botStatus);
logger.debug('++++ Bot Access : ' + AppConfig.BOT_ACCESS);
logger.debug('++++ HOST       : ' + host);
logger.debug('++++ API HOST   : ' + apiHost);
*/
