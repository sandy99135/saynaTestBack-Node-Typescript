"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteResolver {
    static getInstance(server) {
        if (RouteResolver.routeResolver == null) {
            RouteResolver.routeResolver = new RouteResolver();
        }
        RouteResolver.server = server;
        return RouteResolver.routeResolver;
    }
    appendRoute(route) {
        if (RouteResolver.server.routes == null) {
            RouteResolver.server.routes = new Array();
        }
        RouteResolver.server.routes.push(route);
    }
}
exports.RouteResolver = RouteResolver;
RouteResolver.routeResolver = null;
RouteResolver.server = null;
//# sourceMappingURL=route-resolver.js.map