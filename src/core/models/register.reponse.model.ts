import {ResponseModel} from './response.model';
import {JwtToken} from './jwt-token.model'
export class RegisterResponseModel extends ResponseModel{
	token :JwtToken

}