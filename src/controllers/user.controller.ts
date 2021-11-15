import { BaseController } from "../core/interfaces/base-controller";
import { LoginReq } from "../core/models/loginreq.model";
import { RegisterResponseModel } from "../core/models/register.reponse.model";
import { ResponseModel } from "../core/models/response.model";
import { UpdateUser } from "../core/models/update-user-model";
import { User } from "../core/models/user.model";
import {  IsEmptyValidatorRegister} from "../core/validators/isEmpty.validator";
var bcrypt = require("bcryptjs");
var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const UserTable = require("../core/models/mongoose-model/user-mongoose.model");
var jwt = require("jsonwebtoken");

export class UserController extends BaseController{
	resp: ResponseModel = null
 async registerUser(){

 	try{
		 let reqBody = <User>this.request.body
	
		 if ( !new IsEmptyValidatorRegister().isEmpty(reqBody)) {
			this.response.status=401
			this.resp = { 
				error:true,
				message:"Tous les champs sont obligatoire",
				
			}as ResponseModel
		 }else if (!new IsEmptyValidatorRegister().isEmailValid(reqBody.email)) {
			this.response.status=401
			this.resp = { 
				error:true,
				message:"Email non valide",
				
			}as ResponseModel
		 }
		 else{
			reqBody.password =  bcrypt.hashSync( reqBody.password, 8)
			const user= new UserTable(reqBody)
			this.response.status=201
			const userExisted =  await UserTable.findOne({email:reqBody.email})
			
			
			if (userExisted!=null) {
				console.log("userExisted",userExisted);
				this.response.status=401
				this.resp = { 
				error:true,
				message:"Cet email existe deja",
				
				}as ResponseModel

			}else{
				const userSaved = await user.save() 
				var token =  jwt.sign({ id: user._id },  'secret', {
					expiresIn: 86400 // 24 hours
				  });
				  console.log(token);
				  this.resp  = { 
					error:false,
					message:"L'utilisateur a bien été crée avec succès",
					
				} as ResponseModel
			}
		 }
		 this.response.body=this.resp
		 console.log(this.response.body);
		 
 	
 	}catch(error){
 		this.response.status=500
 		const err : ResponseModel = { 
 			error:false,
 			message:"Erreur survenu",
 			
			 }
			 console.log(error);
			 this.response.body = err
		 }
	 
	 }
	 
	  async login(){
	

		try {
			let reqBody = <LoginReq>this.request.body

			const user =  await UserTable.findOne({email:reqBody.email})
			let error ={count:0, limiteError:5}
			if (user==null) {
				this.response.status=401
				error.count +=1;
				console.log(error);
				
				if (error.count>=error.limiteError) {
					this.resp = { 
						error:true,
						message:"Trop de tentative sur le mail , veuillez reessayer après 1h",
						
						}
				}else{
					localStorage.removeItem("x-access-token")
					this.resp = { 
						error:true,
						message:"Votre email ou passord est erroné",
						
						}
				}
				
			
			}else{
				var passwordIsValid = bcrypt.compareSync(
					reqBody.password,
					user.password
				  );
				if (!passwordIsValid) {
					localStorage.removeItem("x-access-token")
					this.response.status=401
					this.resp = { 
					error:true,
					message:"Votre email ou passord est erroné",
					
					}
				}else{
					this.response.status=201
					var token =  jwt.sign({ id: user._id },  'secret', {
						expiresIn: 3600 // 24 hours
					  });
					  localStorage.setItem("x-access-token",token)
					  console.log(token);
					  this.resp  = { 
						error:false,
						message:"L'utilisateur a bien été crée avec succès",
						token:{
							token:token,
							createdAt:new Date().toString(),
							refresh_token:3600
						}
						
					} as RegisterResponseModel
				}
			}
			this.response.body = this.resp
			console.log(this.response.body);
		
			
		} catch (error) {
			this.response.status=500
 			const err : ResponseModel = { 
 			error:false,
 			message:"Erreur survenu",
 			
			 }
			 console.log(error);
			 this.response.body = err
		}
	 }

	  async verifyToken(){
		let token = localStorage.getItem("x-access-token");
		console.log("token",token);
		
		if (token== null ||token == undefined) {
			
			this.resp = { 
			error:true,
			message:"le token envoyé n' existe pas",
			
				}as ResponseModel
			console.log("logeo ny erreur",this.resp);
			
		}else{
			try {
				let decoded = await jwt.verify(token, "secret")
				console.log(decoded);
				
				if (decoded !=null||decoded !=undefined) {
				
					this.resp = { 
					error:false,
					message:"token verifié avec succès",
				
					}as RegisterResponseModel
				}else{
					
					this.resp = { 
					error:true,
					message:"Votre token n' est plus valide , veuillez le réinitialiser",
				
					}as RegisterResponseModel
				}
				
				
				
			} catch (error) {
				console.log(error);
				this.response.status=500
 				const err : ResponseModel = { 
 				error:false,
 				message:"Erreur survenu",
 			
			 }
			
			 this.response.body = err
				
			}
		}
		return this.resp
		
	
			
	 }
	  async getAllUser(){
		try {
			let response = await this.verifyToken()
			console.log("response", response);
			
			if (response.error) {
				this.response.status=401
				this.response.body = response
				
				
			}else{
				const users =  await UserTable.find()
				this.response.status=200
				this.response.body= {error:false,users:users}
			}
			console.log(this.response);
			
		} catch (error) {
			console.log(error);
			this.response.status=500
 			const err : ResponseModel = { 
 			error:false,
 			message:"Erreur survenu",
 			
			 }
			
			 this.response.body = err
		}
	  }

	  async getUserById(){
		try {
			let response = await this.verifyToken()
			console.log("response", response);
			
			if (response.error) {
				this.response.status=401
				this.response.body = response
				
				
			}else{
				const users =  await UserTable.findById(this.request.parms._id)
				if (users==null) {
					this.response.status=401
					this.response.body = {error:true,message:"cet utilisateur n' existe pas"}
				}else{
					this.response.status=200
					this.response.body= {error:false,users:users}
				}
				
			}
			console.log(this.response);
			
		} catch (error) {
			console.log(error);
			this.response.status=500
 			const err : ResponseModel = { 
 			error:false,
 			message:"Erreur survenu",
 			
			 }
			
			 this.response.body = err
		}
	  }

	  async EditUserInfo(){
		try {
			let response = await this.verifyToken()
			console.log("response", response);
			
			if (response.error) {
				this.response.status=401
				this.response.body = response
				
				
			}else{
				let reqBody = <UpdateUser>this.request.body
				console.log(reqBody);
				
				const users =  await UserTable.findById(this.request.body._id)
				if (users==null) {
					this.response.status=401
					this.response.body = {error:true,message:"cet utilisateur n' existe pas"}
				}else{
					let result =  await UserTable.findOneAndUpdate({_id:this.request.body._id},reqBody)
					console.log(result);
					
					this.response.status=200
					this.response.body= {error:false,message:"modification effectué avec succès"}
				}
				
				
			}
			console.log(this.response);
			
		} catch (error) {
			
		}
	  }

	  async deconnectUser(){
		try {
			
			localStorage.removeItem("x-access-token")
			this.response.status=200
			this.response.body= {error:false,message:"deconnection effectué avec succès"}
			
			console.log(this.response);
			
		} catch (error) {
			console.log(error);
			this.response.status=500
 			const err : ResponseModel = { 
 			error:false,
 			message:"Erreur survenu",
 			
			 }
			
			 this.response.body = err
		}
	  }
 	
 	 
}