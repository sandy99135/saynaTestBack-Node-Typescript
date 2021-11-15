/*import { AppConfig } from "../app-start/app-config";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
import { SecurityService } from "../services/security.service";
const request = require('request');
export class ViberMiddleware {
    private securityService: SecurityService;
    constructor() {
        this.securityService = SecurityService.getInstance();
    }
 

    // sendDefaultRequest(requestMethod: HttpRequestMethod, url: string,queryParam: any, body: any, callback) {
    //     request({
    //         "uri": url,
    //         "qs": queryParam,
    //         "method": requestMethod,
    //         "json": body,
    //         "timeout": AppConfig.MiddlwareRequestTimeout
    //     }, (err, res, body) => {
    //         if (err) {
    //             callback({ statusCode: 500 });
    //         } else {
    //             callback({ statusCode: res.statusCode, body: body });
    //         }
    //     });
    // }

     executeRequest(token: string, requestMethod: HttpRequestMethod, url: string, queryParam: any, body: any, callback) {
        console.log(requestMethod + ": " + url);
        request({
            "uri": url,
            "qs": queryParam,
            "method": requestMethod,
            "headers": { "X-Viber-Auth-Token":  token },
            "json": body,
            "timeout": AppConfig.MiddlwareRequestTimeout
        }, (err, res, body) => {
            if (err) {
                callback({ statusCode: 500 });
            } else {
                callback({ statusCode: res.statusCode, body: body });
            }
        });
    }

}*/ 
//# sourceMappingURL=viber.middleware.js.map