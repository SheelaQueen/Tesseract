"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
class TesseractClientLogger {
    constructor(client) {
        this.error = (...message) => {
            console.info(chalk `{red [ERROR} {gray ${new Date()}}{red ]}`);
            console.error(...message);
            console.trace();
            console.info(chalk `{red [ERROR]}`);
        };
        this.info = (...message) => {
            console.info(chalk `{gray ${new Date()}}`, ...message);
        };
        this.message = (...message) => {
            const username = this.client.user ? this.client.user.username : "BOT";
            console.info(chalk.gray(new Date()));
            console.info(chalk `{cyan [${username}]:}`, ...message);
        };
        this.warn = (...message) => {
            console.info(chalk `{yellow [WARNING} {gray ${new Date()}}{yellow ]}`);
            console.warn(...message);
            console.trace();
            console.info(chalk `{yellow [WARNING]}`);
        };
        this.client = client;
    }
}
exports.default = TesseractClientLogger;
//# sourceMappingURL=TesseractClientLogger.js.map