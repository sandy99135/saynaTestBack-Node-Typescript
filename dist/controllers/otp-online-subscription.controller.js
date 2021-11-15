/*import { BaseController } from "../core/interfaces/base-controller";
import { AppConfig } from "../app-start/app-config";

export class OtpOnlineSubscriptionController extends BaseController {

    //GET
    executeNotDefaultLogic(serverRequest, serverResponse){
         new GetReceiptChain(null).executeProcess({
            queryParams: serverRequest.query,
            callback: function (data: any) {
                //console.log(JSON.stringify(data));
                serverResponse.sendFile(AppConfig.receiptDir + data.body.replace('"', '').replace('"', '').trim(), 'test.pdf');
            }
        });
    }
}*/ 
//# sourceMappingURL=otp-online-subscription.controller.js.map