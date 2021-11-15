import { HttpRequestModel } from "../models/http-request.model";
import { HttpResponseModel } from "../models/http-response.model";
import { TranslationService } from "../../translations/translation-service";


export abstract class BaseController {
    public request: HttpRequestModel;
    public response: HttpResponseModel|any;
    protected transService: TranslationService;
    
    constructor(){
        this.request = new HttpRequestModel();
        this.response = new HttpResponseModel();
		
    }
}