import { Route } from "../models/route";
import { HttpServer } from "../server";

export class RouteResolver {
    private static routeResolver: RouteResolver = null;
    private static server: HttpServer = null;
    public static getInstance(server: HttpServer):RouteResolver{
        if(RouteResolver.routeResolver == null){
            RouteResolver.routeResolver = new RouteResolver();
        }
        RouteResolver.server = server;
        return RouteResolver.routeResolver;
    }

    appendRoute(route: Route){
        if(RouteResolver.server.routes == null){
            RouteResolver.server.routes = new Array<Route>(); 
        }
        RouteResolver.server.routes.push(route);
    }
}