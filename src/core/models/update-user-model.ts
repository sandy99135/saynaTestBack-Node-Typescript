import { SexEnum } from "../enums/sexe.enum"

export class UpdateUser{
    constructor(){
        this.firstname =""
        this.lastname =""
        this.date_naissance =""
        this.sexe = null
    
    }
    _id:string
    firstname:string
    lastname:string
    date_naissance:string
    sexe: SexEnum
   
}