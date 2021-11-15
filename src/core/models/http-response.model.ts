import { HttpHeader } from "./htt-header.model";

export class HttpResponseModel{
    status: number = 200;
    body: any;
    isFileResult: boolean = false;
    filePath: string;
    isViewToRender: boolean = false;
    view: string;
    data: any;
    headers: Array<HttpHeader>;
    constructor(){
        this.headers = new Array<HttpHeader>();
    }
}