"use strict";
/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const discord_js_1 = require("discord.js");
const TesseractClientUtils_1 = require("./TesseractClientUtils");
const ListenerModuleManager_1 = require("../listeners/ListenerModuleManager");
const MonitorModuleManager_1 = require("../monitors/MonitorModuleManager");
const CommandModuleManager_1 = require("../commands/CommandModuleManager");
class TesseractClient extends discord_js_1.Client {
    constructor(options = {}) {
        super(options);
        this.options = options;
        this.loadSettings();
        this.utils = new TesseractClientUtils_1.default(this);
        new ListenerModuleManager_1.default(this);
        new MonitorModuleManager_1.default(this);
        new CommandModuleManager_1.default(this);
    }
    loadSettingsFile(file, directory = path.resolve("./settings/")) {
        let filePath = path.join(directory, file + ".yaml");
        let settingsFile = fs.readFileSync(filePath, "utf8");
        return YAML.parse(settingsFile);
    }
    loadSettings() {
        this.configurations = this.loadSettingsFile("configurations");
        this.credentials = this.loadSettingsFile("credentials");
    }
    login(token) {
        if (token)
            this.credentials.token = token;
        return super.login(this.credentials.token);
    }
    toString() {
        return "Tesseract";
    }
}
exports.default = TesseractClient;
//# sourceMappingURL=TesseractClient.js.map