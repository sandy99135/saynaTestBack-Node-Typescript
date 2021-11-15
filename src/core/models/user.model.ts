import { SexEnum } from "../enums/sexe.enum"

export class User{
    constructor(){
        this.firstname =""
        this.lastname =""
        this.date_naissance =""
        this.password =""
        this.email =""
        this.sexe = null

    }
    firstname:string
    lastname:string
    date_naissance:string
    email:string
    password :string
    sexe: SexEnum
}