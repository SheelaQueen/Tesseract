"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModule_1 = require("../TesseractModule");
const Constants_1 = require("../utils/Constants");
class ListenerModule extends TesseractModule_1.default {
    constructor(name, options = {}) {
        super(name);
        this.emitter = options.emitter || "tesseract";
        this.mode = options.mode || Constants_1.LISTENER_MODE.ON;
    }
}
exports.default = ListenerModule;
//# sourceMappingURL=ListenerModule.js.map