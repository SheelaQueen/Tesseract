"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModule_1 = require("../TesseractModule");
class MonitorModule extends TesseractModule_1.default {
    constructor(name, options) {
        super(name);
        this.name = name;
        this.event = options.event;
        this.frequency = options.frequency;
    }
}
exports.default = MonitorModule;
//# sourceMappingURL=MonitorModule.js.map