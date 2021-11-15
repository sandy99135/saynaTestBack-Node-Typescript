import { HttpRequestMethod } from "../enums/http-request-method.enum";
import { BaseController } from "./base-controller";

export abstract class Routeed{
    requestMethod: HttpRequestMethod
    uri: string
    action: string
    controller: string
}