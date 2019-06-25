"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class TesseractModule extends events_1.EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.client = null;
        this.manager = null;
    }
    toString() {
        return this.name;
    }
}
exports.default = TesseractModule;
//# sourceMappingURL=TesseractModule.js.map