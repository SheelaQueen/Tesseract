"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class TesseractClientMonitors {
    constructor(client) {
        this.client = client;
    }
    exec(event, ...argv) {
        let monitorPath = path.join(this.client.monitorsDirectory, event);
        let monitor = require(monitorPath);
        monitor(...argv);
    }
}
exports.default = TesseractClientMonitors;
//# sourceMappingURL=TesseractClientMonitors.js.map