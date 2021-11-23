import express from 'express';
import { Route } from './models/route';
import { HttpRequestMethod } from './enums/http-request-method.enum';
import { RequestObsever } from './interfaces/request-obsever.interface';
import { RouteResolver } from './resolvers/route-resolver';
import { HttpResponseModel } from './models/http-response.model';
import { HttpHeader } from './models/htt-header.model';
import { HttpRequestModel } from './models/http-request.model';
const util = require("util");
const body_parser = require('body-parser');
const fs = require('fs');
const http = require('http');
const mongoose = require("mongoose")
/*const mongoose = require("mongoose")*/


export class HttpServer {
    private httpsServer: any = null;
    private httpServer: any = null;
    private server: any = null;
    public routes: Array<Route> = null;
    public obsevers: Array<RequestObsever>;
    constructor(private port: number) {
        this.routes = new Array<Route>();
        this.obsevers = new Array<RequestObsever>();
    }

    configureLogger() {
        /*function formatArgs(args) {
            return [util.format.apply(util.format, Array.prototype.slice.call(args))];
        }
        //console.log = function() {
            logger.info.apply(logger, formatArgs(arguments));
        }; 
        console.error = function() {
            logger.error.apply(logger, formatArgs(arguments));
        }; 
        const { wrapConsole } = require('@r3wt/log');
        const log = logger
        wrapConsole(log);*/

    }

    initialize() {
        //this.configureLogger();
        if (this.server == null) this.server = express();
        this.httpServer = http.createServer(this.server);
        this.server.use(body_parser.json());
        this.server.set('view engine', 'ejs'); // set the view engine to ejs
        this.server.use(body_parser.urlencoded({ extended: false }));
        this.server.use(express.static(process.cwd() + '\\dist\\public'));
        this.server.use(express.static(process.cwd() + '\\dist\\public\\receipts'));
        this.server.use(express.static(process.cwd() + '\\views'))
        //console.log('');
    }
    private beforeExecuteRequest(context: any) {
        this.obsevers.forEach(function (obsever: RequestObsever) {
            obsever.beforeExecuteRequest(context);
        }.bind(this));
    }

    private onSuccess(context: any, res: any) {
        this.obsevers.forEach(function (obsever: RequestObsever) {
            obsever.onSucces(context, res);
        }.bind(this));
    }

    private onError(context: any, error: any) {
        this.obsevers.forEach(function (obsever: RequestObsever) {
            obsever.onError(context, error);
        }.bind(this));
    }

    private setHttpRequest(uri: string, serverRequest: any, request: HttpRequestModel) {
        request.body = serverRequest.body;
        request.queryParams = serverRequest.query;
        request.uri = uri;
        request.parms = serverRequest.params
        Object.keys(serverRequest.headers).forEach((key) => {
            request.headers.push({ name: key, value: serverRequest.headers[key] } as HttpHeader);
        });
    }

    private prepareAndSendResponse(serverResponse: any, response: HttpResponseModel) {
        response.headers.forEach((header: HttpHeader) => {
            serverResponse.setHeader(header.name, header.value);
        });
        serverResponse.status(response.status);
        
        if (response.isFileResult) {
            if (response.filePath == null || response.filePath.trim() == '') throw new Error('File path must not null.');
            serverResponse.sendFile(response.filePath);
        } else if (response.isViewToRender) {
            if (response.view == null || response.view.trim() == '') throw new Error('View must exist.');
            serverResponse.render(response.view, response.data);
        } else {
            serverResponse.send(response.body);
        }

    }

    registerRoutes() {
        this.routes.forEach(function (route: Route) {
            switch (route.requestMethod) {
                //for GET route action
                case HttpRequestMethod.GET: {
                    this.server.get(route.uri, function (serverRequest, serverResponse) {
                        let controllerInstance = null;
                        try {
                            if (route.useDefaultLogic) {
                                try {
                                    controllerInstance = eval('route.controller()');
                                    this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                                    this.beforeExecuteRequest(serverRequest);
                                    eval('controllerInstance.' + route.action + '()');
                                    this.onSuccess(controllerInstance, controllerInstance.response);
                                } catch (error) {
                                    this.onError(this, error)
                                }
                                this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            } else {
                                controllerInstance = eval('route.controller()');
                                controllerInstance.executeNotDefaultLogic(serverRequest, serverResponse);
                            }
                        } catch (error) {
                            this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                        }
                        controllerInstance = null;
                    }.bind(this));
                } break;

                //for POST route action
                case HttpRequestMethod.POST: {
                    this.server.post(route.uri, function (serverRequest, serverResponse) {
                        let controllerInstance = null;
                        try {
                            controllerInstance = eval('route.controller()');
                            this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                            this.beforeExecuteRequest(serverRequest);
                            eval('controllerInstance.' + route.action + '()');
                            this.onSuccess(controllerInstance, controllerInstance.response);
                        } catch (error) {
                            this.onError(controllerInstance, error)
                        }
                        this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                        controllerInstance = null;
                    }.bind(this));
                } break;

                case HttpRequestMethod.PUT: {
                    this.server.put(route.uri, function (serverRequest, serverResponse) {
                        let controllerInstance = null;
                        try {
                            if (route.useDefaultLogic) {
                                try {
                                    controllerInstance = eval('route.controller()');
                                    this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                                    this.beforeExecuteRequest(serverRequest);
                                    eval('controllerInstance.' + route.action + '()');
                                    this.onSuccess(controllerInstance, controllerInstance.response);
                                } catch (error) {
                                    this.onError(this, error)
                                }
                                this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            } else {
                                controllerInstance = eval('route.controller()');
                                controllerInstance.executeNotDefaultLogic(serverRequest, serverResponse);
                            }
                        } catch (error) {
                            this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                        }
                        controllerInstance = null;
                    }.bind(this));
                } break;


                case HttpRequestMethod.DELETE: {
                    this.server.delete(route.uri, function (serverRequest, serverResponse) {
                        let controllerInstance = null;
                        try {
                            if (route.useDefaultLogic) {
                                try {
                                    controllerInstance = eval('route.controller()');
                                    this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                                    this.beforeExecuteRequest(serverRequest);
                                    eval('controllerInstance.' + route.action + '()');
                                    this.onSuccess(controllerInstance, controllerInstance.response);
                                } catch (error) {
                                    this.onError(this, error)
                                }
                                this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            } else {
                                controllerInstance = eval('route.controller()');
                                controllerInstance.executeNotDefaultLogic(serverRequest, serverResponse);
                            }
                        } catch (error) {
                            this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                        }
                        controllerInstance = null;
                    }.bind(this));
                } break;
            }
        }.bind(this));
    }
    start() {
        this.initialize();
        this.httpServer.listen((this.port + 1), err => {
            if (err) {
                console.log(err);
            }
            console.log(`Http server is listening on ${this.port + 1}`);
        });
        mongoose.connect("mongodb+srv://sandy:tsitsimalala@cluster0-nkfjf.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser:true},function(error){
            if(error){
                console.log(error)
            }
            console.log("connected to database")
        })
     
    }
} 
