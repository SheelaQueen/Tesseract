"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModule_1 = require("../TesseractModule");
const Constants_1 = require("../utils/Constants");
const TesseractError_1 = require("../errors/TesseractError");
class ListenerModule extends TesseractModule_1.default {
    constructor(name, options = {}) {
        super(name);
        this.emitter = options.emitter || "tesseract";
        this.mode = options.mode || Constants_1.LISTENER_MODE.ON;
    }
    exec(...args) {
        throw new TesseractError_1.default(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract method 'exec' from class 'ListenerModule'`);
    }
}
exports.default = ListenerModule;
//# sourceMappingURL=ListenerModule.js.map