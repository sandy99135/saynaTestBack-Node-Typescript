"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/interfaces/base-controller");
const locale_config_1 = require("../app-start/locale-config");
class TestController extends base_controller_1.BaseController {
    test() {
        this.response.body = locale_config_1.transService.translate('balance.this.is.your.balance.text.1');
    }
}
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map