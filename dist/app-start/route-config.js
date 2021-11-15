"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_request_method_enum_1 = require("../core/enums/http-request-method.enum");
const page_controller_1 = require("../controllers/page.controller");
const user_controller_1 = require("../controllers/user.controller");
class RouteConfig {
    static register(routeResolver) {
        routeResolver.appendRoute({
            controller: () => { return new page_controller_1.PageController(); },
            action: 'renderPage',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new user_controller_1.UserController(); },
            action: 'registerUser',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/register',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new user_controller_1.UserController(); },
            action: 'login',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/login',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new user_controller_1.UserController(); },
            action: ' verifyToken',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/verify',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new user_controller_1.UserController(); },
            action: ' getAllUser',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/users',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new user_controller_1.UserController(); },
            action: ' getUserById',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/users/:_id',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new user_controller_1.UserController(); },
            action: ' EditUserInfo',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.PUT,
            uri: '/user/edit',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new user_controller_1.UserController(); },
            action: ' deconnectUser',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.DELETE,
            uri: '/signout',
            useDefaultLogic: true
        });
    }
}
exports.RouteConfig = RouteConfig;
//# sourceMappingURL=route-config.js.map