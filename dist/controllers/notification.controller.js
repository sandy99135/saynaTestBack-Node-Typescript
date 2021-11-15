// import { BaseController } from "../core/interfaces/base-controller";
// import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
// import { AppConfig } from "../app-start/app-config";
// import { NotificationChaiResolverFactory } from "../factories/notification-chain-resolver.factory";
// export class NotificationController extends BaseController {
//     //POST
//     notification() {
//         if (this.request.body) {// later to check if from API
//             //console.log('');
//             //console.log(JSON.stringify(this.request.body, null, 4));
//             const notificationType = this.request.body.type;
//             const fbId = this.request.body.fbId;
//             const body = this.request.body;
//             //let notificationChainResolver: ProcessChainResolverInterface = NotificationChaiResolverFactory.getNotificationChainByType(notificationType, fbId, body, AppConfig.fbAccessToken);               
//             let notificationChainResolver = null;
//             if (notificationChainResolver != null) {
//                 const chain = notificationChainResolver.getProcessChain(null);
//                 chain.executeProcess(body);
//                 this.response.body = "Notification sent.";
//             } else {
//                 this.response.status = 404;
//                 this.response.body = "Notification Not Found"
//             };
//         } else {
//             this.response.status = 500;
//             this.response.body = "Error"
//         }
//     }
//     //POST
//     notificationAgencePartenaire() {
//         if (this.request.body) {// later to check if from API
//             //console.log('');
//             //console.log(JSON.stringify(this.request.body, null, 4));
//             const notificationType = this.request.body.type;
//             const fbId = this.request.body.fbId;
//             const body = this.request.body;
//             //let notificationChainResolver: ProcessChainResolverInterface = NotificationChaiResolverFactory.getNotificationChainByType(notificationType, fbId, body, AppConfig.fbAgencePartenaireAccessToken);               
//             let notificationChainResolver = null;
//             if (notificationChainResolver != null) {
//                 const chain = notificationChainResolver.getProcessChain(null);
//                 chain.executeProcess(body);
//                 this.response.body = "Notification sent.";
//             } else {
//                 this.response.status = 404;
//                 this.response.body = "Notification Not Found"
//             };
//         } else {
//             this.response.status = 500;
//             this.response.body = "Error"
//         }
//     }
// }
//# sourceMappingURL=notification.controller.js.map