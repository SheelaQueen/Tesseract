"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const events_1 = require("events");
const discord_js_1 = require("discord.js");
const walkDirectory_1 = require("./utils/walkDirectory");
class TesseractModuleManager extends events_1.EventEmitter {
    constructor(client, options) {
        super();
        this.client = client;
        this.directory = options.directory;
        this.modules = new discord_js_1.Collection();
    }
    storeModule(module) {
        this.modules.set(module.name, module);
    }
    initializeModule(module) {
        module.client = this.client;
        module.manager = this;
        module.exec = module.exec.bind(module);
        return module;
    }
    loadModule(file) {
        let module = new (require(file))();
        this.initializeModule(module);
        this.storeModule(module);
        return module;
    }
    load() {
        let moduleDirectory = path.resolve(this.directory);
        console.log(fs.existsSync(moduleDirectory));
        let files = walkDirectory_1.default(moduleDirectory);
        files = files.filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of files)
            this.loadModule(file);
    }
}
exports.default = TesseractModuleManager;
//# sourceMappingURL=TesseractModuleManager.js.map