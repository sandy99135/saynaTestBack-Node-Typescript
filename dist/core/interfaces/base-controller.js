"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_request_model_1 = require("../models/http-request.model");
const http_response_model_1 = require("../models/http-response.model");
class BaseController {
    constructor() {
        this.request = new http_request_model_1.HttpRequestModel();
        this.response = new http_response_model_1.HttpResponseModel();
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base-controller.js.map