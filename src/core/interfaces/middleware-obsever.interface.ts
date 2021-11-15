export interface MiddlewareObsever{
    beforeExecuteRequest(context: any);
    onSucces(context: any, res:any);
    onError(context: any, error: any);
}