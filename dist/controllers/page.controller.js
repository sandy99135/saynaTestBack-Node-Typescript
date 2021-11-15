"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/interfaces/base-controller");
class PageController extends base_controller_1.BaseController {
    renderPage() {
        try {
            this.response.isFileResult = true;
            this.response.filePath = process.cwd() + "\\dist\\public\\index.html";
        }
        catch (_a) {
            this.response.status = 404;
            this.response.isFileResult = true;
            this.response.filePath = process.cwd() + "\\dist\\public\\404.notfound.html";
        }
    }
}
exports.PageController = PageController;
//# sourceMappingURL=page.controller.js.map