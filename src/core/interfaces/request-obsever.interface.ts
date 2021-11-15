export interface RequestObsever{
    beforeExecuteRequest(context: any);
    onSucces(context: any, res:any);
    onError(context: any, error: any);
}