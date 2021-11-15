import { HttpRequestMethod } from "../enums/http-request-method.enum";

export class Route{
    requestMethod: HttpRequestMethod
    uri: string
    action: string
    controller: any
    useDefaultLogic: boolean = true
}