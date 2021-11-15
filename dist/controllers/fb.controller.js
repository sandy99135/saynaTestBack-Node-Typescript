// import { BaseController } from "../core/interfaces/base-controller";
// import { SessionService } from "../services/session.service";
// import { ClientSession } from "../interfaces/client-session.interface";
// import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
// import { ProcessChainResolverFactory } from "../factories/process-chain-resolver.factory";
// import { AppConfig } from "../app-start/app-config";
// import { GreetingProcessChainResolver } from "../resolvers/common/greeting-process-chain.resolver";
// import { GreetingStepEnum } from "../enums/process/greeting-step.enum";
// import { MessageOriginProxy } from "../helpers/message-origin.proxy";
// import { CannotValidatePinThroughMessageChain } from "../process-chains/pin/cannot-validate-pin-through-message.chain";
// import { Chain } from "../interfaces/chain.interface";
// import { DefaultPayloadResolver } from "../resolvers/others/default-payload.resolver";
// import { PayloadResolver } from "../interfaces/payload.resolver.interface";
// import { PayloadResolverFactory } from "../factories/payload-resolver.factory";
// import { BotSenderActionChain } from "../process-chains/api-messenger-platform/bot-sender-action.chain";
// import { IServiceAcl } from "../interfaces/service-acl.interface";
// import { ServiceAclFactory } from "../factories/service-acl.factory";
// import { ServiceUnderMaintenanceProcessChainResolver } from "../resolvers/common/service-under-maintenance-process-chain.resolver";
// import { LogService } from "../services/log.service";
// import { logger } from "../services/logger.service";
// import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
// import { DataResponseFromApi } from "../models/data-response-from-api/data-response.model";
// import { FbTextMessageBuilder } from "../builders/fb-text-message.builder";
// import { SocialMediaClient } from "../models/social-media/social-media-client";
// import { SocialMediaContext } from "../interfaces/social-media/social-media-context.intefrace";
// export class FbController extends BaseController {
//     //GET
//     home() {
//         this.response.isFileResult = null
//         this.response.isViewToRender = null
//         this.response.body = "Welcome to MyAccès API."
//     }
//     //GET
//     getWebhook() {
//         //console.log('***********GET /WEBHOOK');
//         var mode = this.request.queryParams['hub.mode'];
//         var token = this.request.queryParams['hub.verify_token'];
//         var challenge = this.request.queryParams['hub.challenge'];
//         if (mode && token) {
//             if (mode === 'subscribe' && token === "1234567890") {
//                 //console.log('--------- Verification TOKEN : SUCESS');
//                 this.response.status = 200;
//                 this.response.body = challenge;
//                 // res.status(200).send(challenge);
//             } else {
//                 this.response.status = 403;
//                 //res.sendStatus(403);
//             }
//         } else {
//             this.response.status = 200;
//             this.response.body = "verify.token.failed";
//             //res.status(200).send("verify.token.failed");
//         }
//     }
//     //POST
//     postWebhook() {
//         let sessionService: SessionService = new SessionService();
//         if (this.request.body.object === 'page') {
//             this.request.body.entry.forEach(function (entry) {
//                 const webhook_event = entry.messaging[0];
//                 const sender_psid: string = webhook_event.sender.id;
// 				//console.log("senderid ", sender_psid);
// 				if(entry.id == AppConfig.NOTIF_PAGE_ID){
// 					console.log("****************NOTIF PAGE***************");
// 					try {
// 							if (webhook_event.message) {
// 								if (webhook_event.message.text) {
// 									this.apiMiddleware.sendRequest(
// 										HttpRequestMethod.POST,
// 										AppConfig.apiCheckAgenceCredential,
// 										null,
// 										{credential: webhook_event.message.text, fbId: sender_psid},
// 										function (data: DataResponseFromApi) {
// 											if (data.statusCode == 200) {
// 												//console.log(data);
// 												this.fbMiddlware.sendMessage(
// 													HttpRequestMethod.POST,
// 													AppConfig.fbTextMessageUrl,
// 													AppConfig.fbAgencePartenaireAccessToken,
// 													new FbTextMessageBuilder(data.body.result).getFbMessageInstance(sender_psid),
// 													function (data: any) {
// 														//console.log(data);
// 													}.bind(this)
// 												);
// 											}else{
// 												//console.log(data);
// 											}
// 										}.bind(this)
// 									);
// 								}
// 							}
// 					}catch(e)
// 					{
// 						//console.log(e);
// 					}
// 				}else{
// 						// => IMEDIATE STATUS RECEIVED
// 					this.response.body = "OK";
// 					const serviceAcl: IServiceAcl = ServiceAclFactory.getInstance().getServiceAclInstance();
// 					if (!serviceAcl.isServiceAvailable(sender_psid)) {
// 						//console.log(`FBID : ${sender_psid}`);
// 						this.executeServiceIsUnderMaintenance(sessionService, sender_psid);
// 					} else {
// 						//new InformClient(sender_psid).botIsTyping();
// 						let clientSession: ClientSession = sessionService.getSession(sender_psid);
// 						//if client write a text message & send attachment
// 						const logService = new LogService();
// 						try {
// 							if (webhook_event.message) {
// 								if (webhook_event.message.text) {
// 									//console.log('');
// 									console.log("text payload " + webhook_event.message.text);
// 									const payloadResolver: PayloadResolver = PayloadResolverFactory.getInstance().getPayloadResolverInstance();
// 									const payload: string = payloadResolver.resolvePayload(webhook_event.message.text, clientSession);
// 									console.log(`------ Pyaload? = ${payload}`);
// 									if (payload != null) {
// 										//console.log('------ SO PROCESS PAYLOAD');
// 										this.executePayload(clientSession, sessionService, sender_psid, webhook_event.message.text);
// 										logService.logInteraction('Client', sender_psid, null, webhook_event.message.text, null, null)
// 									} else {
// 										//console.log('------ SO PROCESS MESSAGE')
// 										this.executeMessage(clientSession, sessionService, sender_psid, webhook_event.message.text);
// 										logService.logInteraction('Client', sender_psid, webhook_event.message.text, null, null, null)
// 									}
// 								} else if (webhook_event.message.attachments) { // messsage ATTACHEMENT
// 									//console.log(JSON.stringify(webhook_event.message.attachments, null, 3));
// 									const imageUrl: any = webhook_event.message.attachments[0].payload.url;
// 									this.executeAttachment(clientSession, sessionService, sender_psid, imageUrl);
// 									logService.logInteraction('Client', sender_psid, null, null, imageUrl, null)
// 								};
// 								//if the client click a button
// 							} else if (webhook_event.postback) {
// 								console.log("postback button payload " + webhook_event.postback.payload);
// 								this.executePayload(clientSession, sessionService, sender_psid, webhook_event.postback.payload);
// 								logService.logInteraction('Client', sender_psid, null, webhook_event.postback.payload, null, null)
// 							};
// 						} catch (e) {
// 							//console.log(e)
// 						}
// 					}
// 				}
//             }.bind(this));
//             //this.response.body = "OK";
//         } else {
//             this.response.status = 400;
//             this.response.body = "Bad request, please contact the admnistrator."
//         }
//     }
//     private async executeMessage(socialMediaContext: SocialMediaContext) {
//         // message TEXT
//         // Protect User From validating PIN with Message
//         const messageOrigin = new MessageOriginProxy();
//         if (!socialMediaContext.getClientSession() || messageOrigin.isValid(socialMediaContext.getClientSession() .currentStep)) {
//             const receivedMessage: string = socialMediaContext.getInputMessage().value ;
//             logger.info('Input_Message', {sender : socialMediaContext.getInputMessage().from , text: receivedMessage});
//             let processChainResolver: ProcessChainResolverInterface = ProcessChainResolverFactory.getProcessChainResolverBySession(null, receivedMessage, socialMediaContext);
//             let chain = new BotSenderActionChain(socialMediaContext);
//             if (processChainResolver != null) {
//                 let processChain = await processChainResolver.getProcessChain(socialMediaContext.getClientSession().currentStep, receivedMessage);
//                 chain.setNextChain(processChain);
//                 chain.executeProcess(receivedMessage);
//             } else {
//                 let processChain = new GreetingProcessChainResolver(socialMediaContext).getProcessChain(GreetingStepEnum.GREETING);
//                 chain.setNextChain(processChain);
//                 chain.executeProcess(socialMediaContext.getInputMessage().from);
//             };
//         } else {
//             //Ask the client to Validate the pin through PINPAD
//             //console.log('');
//             //console.log('**** Cannot Accept PIN Validation through Message ');
//             let chain = new BotSenderActionChain(socialMediaContext);
//             let processChain: Chain = new CannotValidatePinThroughMessageChain(socialMediaContext);
//             chain.setNextChain(processChain);
//             chain.executeProcess(socialMediaContext.getInputMessage().value);
//         }
//     };
//     private async executePayload(socialMediaContext: SocialMediaContext) {
//         const receivedPayload: string = socialMediaContext.getInputMessage().value;
//         //console.log('');
//         logger.info('Input_Payload', {sender : socialMediaContext.getInputMessage().from , payload: receivedPayload});
//         let processChainResolver: ProcessChainResolverInterface = ProcessChainResolverFactory.getProcessChainResolverBySession(receivedPayload, null, socialMediaContext);
//         let chain = new BotSenderActionChain(socialMediaContext);
//         if (processChainResolver != null) {
//             let processChain = await processChainResolver.getProcessChain(receivedPayload);
// 			console.log("*************PROCESSS");
// 			//console.log(JSON.stringify(processChain, null, 4));
//             chain.setNextChain(processChain);
//             chain.executeProcess();
//         } else {
//             const processChain = new GreetingProcessChainResolver(socialMediaContext).getProcessChain(GreetingStepEnum.GREETING);
//             chain.setNextChain(processChain);
//             chain.executeProcess(socialMediaContext.getInputMessage().from);
//         }
//     }
//     private async executeAttachment(socialMediaContext: SocialMediaContext, image_url: string) {
//         const imageUrl: any = image_url;
//         //console.log('');
//         logger.info('Input_Image_Url', {sender : socialMediaContext.getInputMessage().from , imageUrl: imageUrl});
//         let processChainResolver: ProcessChainResolverInterface = ProcessChainResolverFactory.getProcessChainResolverBySession(null, null, socialMediaContext);
//         let chain = new BotSenderActionChain(socialMediaContext);
//         if (processChainResolver != null) {
//             let processChain = await processChainResolver.getProcessChain(socialMediaContext.getClientSession().currentStep);
//             chain.setNextChain(processChain);
//             chain.executeProcess(imageUrl);
//         } else {
//             let processChain = new GreetingProcessChainResolver(socialMediaContext).getProcessChain(GreetingStepEnum.GREETING);
//             chain.setNextChain(processChain);
//             chain.executeProcess(socialMediaContext.getInputMessage().from);
//         }
//     }
//     private executeServiceIsUnderMaintenance(socialMediaContext: SocialMediaContext) {
//         // build a resolver that gives 3 chains
//         // bonjour + service is under maintenance + that for understanding
//         // best register fbId if tried and if the maintenance is finished inform them that the service is available right now
//         ////console.log('** Serivce is under maintenance **');
//         let processChainResolver: ProcessChainResolverInterface = new ServiceUnderMaintenanceProcessChainResolver(socialMediaContext)
//         let chain = new BotSenderActionChain(socialMediaContext);
//         let processChain =  processChainResolver.getProcessChain(null);
//         chain.setNextChain(processChain);
//         chain.executeProcess();
//     }
// }
//# sourceMappingURL=fb.controller.js.map