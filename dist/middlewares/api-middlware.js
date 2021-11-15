/*import { HttpRequestModel } from "../core/models/http-request.model";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
import { AppConfig } from "../app-start/app-config";
import { JwtToken } from "../core/models/jwt-token.model";
import { SecurityService } from "../services/security.service";
import { ChannelEnum } from "../enums/social-media/channel.enum";
const request = require('request');
export class ApiMiddleware {
    private securityService: SecurityService;
    public channel: ChannelEnum

    constructor() {
        this.securityService = SecurityService.getInstance();
    }
    setChannel(channel: ChannelEnum) {
        this.channel = channel;
    }
    sendRequest(requestMethod: HttpRequestMethod, url: string, queryParam: any, body: any, callback) {
        /*this.securityService.getToken(function (token: JwtToken) {
            //console.log('Token => ' + token);
            if (token != null) {
                this.objet.executeRequest(token.access_token, this.reqMethod, this.reqUrl, this.reqQueryParam, this.reqBody,this.reqCb)
            } else {
                this.reqCb({ statusCode: 401 });
            }
        }.bind({objet: this, reqMethod: requestMethod, reqUrl:url, reqQueryParam:queryParam, reqBody: body, reqCb: callback}));*/
/* console.log("**************************");

 console.log(this.channel);

 this.executeRequest(this.channel, AppConfig.BOT_BASIC_TOKEN, requestMethod, url, queryParam, body, callback);
}

sendDefaultRequest(requestMethod: HttpRequestMethod, url: string, queryParam: any, body: any, callback) {
 console.log("****url send default request***",url);
 
 request({
     "uri": url,
     "qs": queryParam,
     "method": requestMethod,
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

private executeRequest(channel: ChannelEnum, token: string, requestMethod: HttpRequestMethod, url: string, queryParam: any, body: any, callback) {
 console.log(requestMethod + ": " + url);
 request({
     "uri": url,
     "qs": queryParam,
     "method": requestMethod,
     "headers": {
         Authorization: "Bearer " + token,
         "x-channel": channel
     },
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
//# sourceMappingURL=api-middlware.js.map