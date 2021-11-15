import { RouteResolver } from "../core/resolvers/route-resolver";
import { Route } from "../core/models/route";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
import { PageController } from "../controllers/page.controller";
import { UserController } from "../controllers/user.controller";

export class RouteConfig {
    public static register(routeResolver: RouteResolver) {
        routeResolver.appendRoute(
            {
                controller: () => { return new PageController() },
                action: 'renderPage',
                requestMethod: HttpRequestMethod.GET,
                uri: '/',
                useDefaultLogic: true
            } as Route
        );

         routeResolver.appendRoute(
            {
                controller: () => { return new UserController() },
                action: 'registerUser',
                requestMethod: HttpRequestMethod.POST,
                uri: '/register',
                useDefaultLogic: true
            } as Route
        );
        routeResolver.appendRoute(
            {
                controller: () => { return new UserController() },
                action: 'login',
                requestMethod: HttpRequestMethod.POST,
                uri: '/login',
                useDefaultLogic: true
            } as Route
        );
        routeResolver.appendRoute(
            {
                controller: () => { return new UserController() },
                action: ' verifyToken',
                requestMethod: HttpRequestMethod.GET,
                uri: '/verify',
                useDefaultLogic: true
            } as Route
        );
        routeResolver.appendRoute(
            {
                controller: () => { return new UserController() },
                action: ' getAllUser',
                requestMethod: HttpRequestMethod.GET,
                uri: '/users',
                useDefaultLogic: true
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new UserController() },
                action: ' getUserById',
                requestMethod: HttpRequestMethod.GET,
                uri: '/users/:_id',
                useDefaultLogic: true
            } as Route
        );
        routeResolver.appendRoute(
            {
                controller: () => { return new UserController() },
                action: ' EditUserInfo',
                requestMethod: HttpRequestMethod.PUT,
                uri: '/user/edit',
                useDefaultLogic: true
            } as Route
        );
        routeResolver.appendRoute(
            {
                controller: () => { return new UserController() },
                action: ' deconnectUser',
                requestMethod: HttpRequestMethod.DELETE,
                uri: '/signout',
                useDefaultLogic: true
            } as Route
        );
        
    }
}