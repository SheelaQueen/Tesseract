"use strict";
/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class TesseractClient extends discord_js_1.Client {
    constructor(options) {
        if (typeof options !== "object") {
            throw new TypeError("A TesseractOptions object needs to be passed.");
        }
        if (!('configurations' in options)) {
            throw new ReferenceError("`configurations` object wasn't found in the TesseractOptions object.");
        }
        if (!('credentials' in options)) {
            throw new ReferenceError("`credentials` object wasn't found in the TesseractOptions object.");
        }
        let isValid = options.configurations.prefix && options.credentials.token;
        if (!isValid) {
            throw new TypeError("An invalid TesseractOptions object was passed.");
        }
        super(options);
        this.options = options;
        this.configurations = options.configurations;
        this.credentials = options.credentials;
    }
    reloadSettings(configurations, credentials) {
        if (!configurations && !credentials) {
            return false;
        }
        if (configurations)
            this.configurations = configurations;
        if (credentials)
            this.credentials = credentials;
        return true;
    }
    login(token) {
        if (token) {
            this.credentials.token = token;
        }
        return super.login(this.credentials.token);
    }
    toString() {
        return "Tesseract";
    }
}
exports.default = TesseractClient;
//# sourceMappingURL=TesseractClient.js.map