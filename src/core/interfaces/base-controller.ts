import { HttpRequestModel } from "../models/http-request.model";
import { HttpResponseModel } from "../models/http-response.model";


export abstract class BaseController {
    public request: HttpRequestModel;
    public response: HttpResponseModel|any;
    constructor(){
        this.request = new HttpRequestModel();
        this.response = new HttpResponseModel();
		
    }
}