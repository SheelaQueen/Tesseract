"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TesseractModuleManager_1 = require("../TesseractModuleManager");
class MonitorModuleManager extends TesseractModuleManager_1.default {
    constructor(client) {
        super(client, { directory: "./monitors/" });
        this.load();
    }
    load() {
        super.load();
        const monitors = {};
        const modules = this.modules;
        modules.forEach(monitor => {
            if (monitors.hasOwnProperty(monitor.event)) {
                monitors[monitor.event].push(monitor);
            }
            else {
                monitors[monitor.event] = [monitor];
            }
        });
        for (const event of Object.keys(monitors)) {
            this.client.once(event, (...args) => {
                for (const monitor of monitors[event]) {
                    this.client.setInterval(monitor.exec, monitor.frequency * 1000, ...args);
                }
            });
        }
    }
}
exports.default = MonitorModuleManager;
//# sourceMappingURL=MonitorModuleManager.js.map