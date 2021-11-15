'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./core/server");
const route_resolver_1 = require("./core/resolvers/route-resolver");
const request_obsever_resolver_1 = require("./core/resolvers/request-obsever-resolver");
const request_observer_config_1 = require("./app-start/request-observer-config");
const route_config_1 = require("./app-start/route-config");
let server = new server_1.HttpServer(3000);
server.start();
let routeResolver = route_resolver_1.RouteResolver.getInstance(server);
route_config_1.RouteConfig.register(routeResolver);
server.registerRoutes();
// observer
let observerResolver = request_obsever_resolver_1.RequestObserverResolver.getInstance(server);
request_observer_config_1.RequestObserverConfig.registerObsever(observerResolver);
// const ViberBot = require('viber-bot').Bot;
// const bot : any = new ViberBot({
//     authToken: AppConfig.VIBER_TOKEN,
//     name: AppConfig.VIBER_BOT_NAME,
//     avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
// });
// // console.log(bot);
console.log();
//# sourceMappingURL=app.js.map