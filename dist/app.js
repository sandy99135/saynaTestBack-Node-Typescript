'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./core/server");
const route_resolver_1 = require("./core/resolvers/route-resolver");
const request_obsever_resolver_1 = require("./core/resolvers/request-obsever-resolver");
const request_observer_config_1 = require("./app-start/request-observer-config");
const route_config_1 = require("./app-start/route-config");
require('dotenv').config();
let server = new server_1.HttpServer(3000 || Number(process.env.PORT));
server.start();
let routeResolver = route_resolver_1.RouteResolver.getInstance(server);
route_config_1.RouteConfig.register(routeResolver);
server.registerRoutes();
// observer
let observerResolver = request_obsever_resolver_1.RequestObserverResolver.getInstance(server);
request_observer_config_1.RequestObserverConfig.registerObsever(observerResolver);
//# sourceMappingURL=app.js.map