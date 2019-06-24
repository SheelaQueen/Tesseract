"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModule_1 = require("../TesseractModule");
const TesseractError_1 = require("../errors/TesseractError");
class CommandModule extends TesseractModule_1.default {
    constructor(name, options = {}) {
        super(name);
        this.name = name;
        this.description = options.description;
        this.triggers = options.triggers || [name];
        this.arguments = options.arguments || {};
        this.scope = options.scope;
        this.owner = options.owner || false;
        this.typing = options.typing || false;
        this.cooldown = options.cooldown || 0;
        this.ratelimit = options.ratelimit || 0;
        this.clientPermissions = options.clientPermissions || [];
        this.userPermissions = options.userPermissions || [];
        this.condition = options.condition ? options.condition.bind(this) : () => true;
    }
    exec(message, argv) {
        throw new TesseractError_1.default(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract method 'exec' from class 'CommandModule'`);
    }
}
exports.default = CommandModule;
//# sourceMappingURL=CommandModule.js.map