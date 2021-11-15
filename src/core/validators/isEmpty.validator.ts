import { User } from "../models/user.model";

export class IsEmptyValidatorRegister{
	isEmpty(request:User){
		let obj = new User()
		obj.date_naissance =request.date_naissance
		obj.firstname =request.firstname
		obj.lastname =request.lastname
		obj.email =request.email
		obj.password =request.password
		obj.sexe =request.sexe
		console.log(obj);
		if(obj.date_naissance&&obj.email&&obj.firstname&&obj.lastname&&obj.password&&obj.sexe)  {
				
			return true	
			
		}else{
			return false
		}
 		
	}
	isEmailValid(email:string){
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(re.test(String(email).toLowerCase())){
		   return true
	   }else{
		   return false
	   }
	}
}