// import { FbMessageModel } from "../models/fb-message.model";
// import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
// import { MiddlewareObsever } from "../core/interfaces/middleware-obsever.interface";
// import { AppConfig } from "../app-start/app-config";
// import { SenderActionEnum } from "../enums/api-messenger-plateform/sender-action.enum";
// import { LogService } from "../services/log.service";
// import { logger } from "../services/logger.service";
// const request = require('request');
// export class FbMiddleware {
//     private obsevers: Array<MiddlewareObsever>;
//     constructor() {
//         this.obsevers = new Array<MiddlewareObsever>();
//     }
//     getHttpClient() {
//         return request;
//     }
//     subscribeObsever(obsever: MiddlewareObsever) {
//         if (this.obsevers == null) this.obsevers = new Array<MiddlewareObsever>();
//         this.obsevers.push(obsever);
//     }
//     // Messenger Plateform Messaging API
//     sendMessage(requestMethod: HttpRequestMethod, url: string, accessToken: string, body: FbMessageModel, callback) {
//         const logService = new LogService(); // log service
//         //console.log(JSON.stringify(body, null, 3));
//         this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//             obsever.beforeExecuteRequest(this);
//         }.bind(this));
//         request({
//             "uri": url,
//             "qs": { access_token: accessToken },
//             "method": requestMethod,
//             "json": body,
//             "timeout": AppConfig.MiddlwareRequestTimeout
//         }, (err, res, next) => {
//             //console.log("Res = ",res);
//             if (err) {
//                 logger.error("Unable to send Message", { Error: err })
//                 this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//                     obsever.onError(this, res);
//                 }.bind(this));
//                 callback({ statusCode: 500 });
//                 logService.logInteraction('Bot', body.recipient.id, 'Unable to send Message', null, null, null)
//             } else {
//                 this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//                     obsever.onSucces(this, res);
//                 }.bind(this));
// 				//console.log(JSON.stringify(res.body, null, 3));
//                 callback({ statusCode: res.statusCode, body: body });
//                 logService.logInteraction('Bot', body.recipient.id, 'Send message', null, null, null)
//             }
//         });
//     }
//     // Messenger Platfom User Profil API
//     getInfo(requestMethod: HttpRequestMethod, url: string, accessToken: string, fields: string, body: FbMessageModel, callback) {
//         this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//             obsever.beforeExecuteRequest(this);
//         }.bind(this));
//         request({
//             "uri": url,
//             "qs": {
//                 fields: fields,
//                 access_token: accessToken
//             },
//             "method": requestMethod,
//             "json": body,
//             "timeout": AppConfig.MiddlwareRequestTimeout
//         }, (err, res, body) => {
//             if (err) {
//                 logger.error("Unable to get User info", { Error: err })
//                 this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//                     obsever.onError(this, res);
//                 }.bind(this));
//                 callback({ statusCode: 500 });
//             } else {
//                 this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//                     obsever.onSucces(this, res);
//                 }.bind(this));
//                 callback({ statusCode: res.statusCode, body: JSON.parse(body) });
//             }
//         });
//     }
//     // Messenger Platfrom Sender Action
//     sendSenderAction(requestMethod: HttpRequestMethod, url: string, senderAction: SenderActionEnum, accessToken: string, fbId: string, callback) {
//         this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//             obsever.beforeExecuteRequest(this);
//         }.bind(this));
//         request({
//             "uri": url,
//             "qs": { access_token: accessToken },
//             "method": requestMethod,
//             "json": { "recipient":{"id":fbId }, "sender_action":senderAction },
//             "timeout": AppConfig.MiddlwareRequestTimeout
//         }, (err, res, body) => {
//             if (err) {
//                 logger.error("Unable to send Sender Action", { Error: err })
//                 this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//                     obsever.onError(this, res);
//                 }.bind(this));
//                 callback({ statusCode: 500 });
//             } else {
//                 this.obsevers.forEach(function (obsever: MiddlewareObsever) {
//                     obsever.onSucces(this, res);
//                 }.bind(this));
//                 callback({ statusCode: res.statusCode, body: body });
//             }
//         });
//     }
// }
//# sourceMappingURL=fb-middleware.js.map