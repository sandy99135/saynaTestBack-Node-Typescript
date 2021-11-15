import { HttpHeader } from "./htt-header.model";

export class HttpRequestModel{
    uri: string;
    queryParams: any;
    body: any;
    headers: Array<HttpHeader>;
    parms: any;
    constructor(){
        this.headers = new Array<HttpHeader>();
    }
}