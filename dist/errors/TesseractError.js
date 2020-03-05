"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TesseractError extends Error {
    constructor(message) {
        super(message);
    }
    get name() {
        return this.constructor.name;
    }
}
exports.default = TesseractError;
//# sourceMappingURL=TesseractError.js.map