"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModule_1 = require("../TesseractModule");
class SchedulerModule extends TesseractModule_1.default {
    constructor(name, options) {
        super(name);
        this.cronTime = options.cronTime;
    }
}
exports.default = SchedulerModule;
//# sourceMappingURL=SchedulerModule.js.map