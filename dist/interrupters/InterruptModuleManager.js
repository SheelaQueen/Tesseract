"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModuleManager_1 = require("../TesseractModuleManager");
class InterruptModuleManager extends TesseractModuleManager_1.default {
    constructor(client) {
        super(client, { directory: "./interrupts/" });
        super.load();
    }
}
exports.default = InterruptModuleManager;
//# sourceMappingURL=InterruptModuleManager.js.map