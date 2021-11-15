'use strict';

import { HttpServer } from "./core/server";
import { RouteResolver } from "./core/resolvers/route-resolver";
import { RequestObserverResolver } from "./core/resolvers/request-obsever-resolver";
import { RequestObserverConfig } from "./app-start/request-observer-config";
import { RouteConfig } from "./app-start/route-config";
require('dotenv').config()


let server = new HttpServer(3000||Number(process.env.PORT));

server.start();
let routeResolver = RouteResolver.getInstance(server);
RouteConfig.register(routeResolver);
server.registerRoutes();

// observer
let observerResolver = RequestObserverResolver.getInstance(server);
RequestObserverConfig.registerObsever(observerResolver);



