import { RequestObsever } from "../interfaces/request-obsever.interface";
import { HttpServer } from "../server";

export class RequestObserverResolver {
    private static observerResolver: RequestObserverResolver = null;
    private static server: HttpServer = null;
    public static getInstance(server: HttpServer):RequestObserverResolver{
        if(RequestObserverResolver.observerResolver == null){
            RequestObserverResolver.observerResolver = new RequestObserverResolver();
        }
        RequestObserverResolver.server = server;
        return RequestObserverResolver.observerResolver;
    }

    public static appendObsever(obsever: RequestObsever){
        if(RequestObserverResolver.server.obsevers == null){
            RequestObserverResolver.server.obsevers = new Array<RequestObsever>(); 
        }
        RequestObserverResolver.server.obsevers.push(obsever);
    }
}