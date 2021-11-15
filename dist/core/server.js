"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_request_method_enum_1 = require("./enums/http-request-method.enum");
const util = require("util");
const body_parser = require('body-parser');
const fs = require('fs');
const http = require('http');
const mongoose = require("mongoose");
/*const mongoose = require("mongoose")*/
class HttpServer {
    constructor(port) {
        this.port = port;
        this.httpsServer = null;
        this.httpServer = null;
        this.server = null;
        this.routes = null;
        this.routes = new Array();
        this.obsevers = new Array();
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
        if (this.server == null)
            this.server = express_1.default();
        this.httpServer = http.createServer(this.server);
        this.server.use(body_parser.json());
        this.server.set('view engine', 'ejs'); // set the view engine to ejs
        this.server.use(body_parser.urlencoded({ extended: false }));
        this.server.use(express_1.default.static(process.cwd() + '\\dist\\public'));
        this.server.use(express_1.default.static(process.cwd() + '\\dist\\public\\receipts'));
        this.server.use(express_1.default.static(process.cwd() + '\\views'));
        //console.log('');
    }
    beforeExecuteRequest(context) {
        this.obsevers.forEach(function (obsever) {
            obsever.beforeExecuteRequest(context);
        }.bind(this));
    }
    onSuccess(context, res) {
        this.obsevers.forEach(function (obsever) {
            obsever.onSucces(context, res);
        }.bind(this));
    }
    onError(context, error) {
        this.obsevers.forEach(function (obsever) {
            obsever.onError(context, error);
        }.bind(this));
    }
    setHttpRequest(uri, serverRequest, request) {
        request.body = serverRequest.body;
        request.queryParams = serverRequest.query;
        request.uri = uri;
        request.parms = serverRequest.params;
        Object.keys(serverRequest.headers).forEach((key) => {
            request.headers.push({ name: key, value: serverRequest.headers[key] });
        });
    }
    prepareAndSendResponse(serverResponse, response) {
        response.headers.forEach((header) => {
            serverResponse.setHeader(header.name, header.value);
        });
        serverResponse.status(response.status);
        if (response.isFileResult) {
            if (response.filePath == null || response.filePath.trim() == '')
                throw new Error('File path must not null.');
            serverResponse.sendFile(response.filePath);
        }
        else if (response.isViewToRender) {
            if (response.view == null || response.view.trim() == '')
                throw new Error('View must exist.');
            serverResponse.render(response.view, response.data);
        }
        else {
            serverResponse.send(response.body);
        }
    }
    registerRoutes() {
        this.routes.forEach(function (route) {
            switch (route.requestMethod) {
                //for GET route action
                case http_request_method_enum_1.HttpRequestMethod.GET:
                    {
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
                                    }
                                    catch (error) {
                                        this.onError(this, error);
                                    }
                                    this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                                }
                                else {
                                    controllerInstance = eval('route.controller()');
                                    controllerInstance.executeNotDefaultLogic(serverRequest, serverResponse);
                                }
                            }
                            catch (error) {
                                this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            }
                            controllerInstance = null;
                        }.bind(this));
                    }
                    break;
                //for POST route action
                case http_request_method_enum_1.HttpRequestMethod.POST:
                    {
                        this.server.post(route.uri, function (serverRequest, serverResponse) {
                            let controllerInstance = null;
                            try {
                                controllerInstance = eval('route.controller()');
                                this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                                this.beforeExecuteRequest(serverRequest);
                                eval('controllerInstance.' + route.action + '()');
                                this.onSuccess(controllerInstance, controllerInstance.response);
                            }
                            catch (error) {
                                this.onError(controllerInstance, error);
                            }
                            this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            controllerInstance = null;
                        }.bind(this));
                    }
                    break;
                case http_request_method_enum_1.HttpRequestMethod.PUT:
                    {
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
                                    }
                                    catch (error) {
                                        this.onError(this, error);
                                    }
                                    this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                                }
                                else {
                                    controllerInstance = eval('route.controller()');
                                    controllerInstance.executeNotDefaultLogic(serverRequest, serverResponse);
                                }
                            }
                            catch (error) {
                                this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            }
                            controllerInstance = null;
                        }.bind(this));
                    }
                    break;
                case http_request_method_enum_1.HttpRequestMethod.DELETE:
                    {
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
                                    }
                                    catch (error) {
                                        this.onError(this, error);
                                    }
                                    this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                                }
                                else {
                                    controllerInstance = eval('route.controller()');
                                    controllerInstance.executeNotDefaultLogic(serverRequest, serverResponse);
                                }
                            }
                            catch (error) {
                                this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            }
                            controllerInstance = null;
                        }.bind(this));
                    }
                    break;
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
        mongoose.connect("mongodb+srv://sandy:andomalala@cluster0-nkfjf.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }, function (error) {
            if (error) {
                console.log(error);
            }
            console.log("connected to database");
        });
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=server.js.map