"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModule_1 = require("../TesseractModule");
const TesseractError_1 = require("../errors/TesseractError");
class InterruptModule extends TesseractModule_1.default {
    constructor(name, options = {}) {
        super(name);
        this.name = name;
    }
    exec(...args) {
        throw new TesseractError_1.default(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract method 'exec' from class 'InterruptModule'`);
    }
}
exports.default = InterruptModule;
//# sourceMappingURL=InterruptModule.js.map