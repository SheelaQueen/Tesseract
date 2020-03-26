"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const discord_js_1 = require("discord.js");
const walkDirectory_1 = require("./utils/walkDirectory");
class TesseractStructureManager {
    static resolveModules(moduleDirectory) {
        const files = walkDirectory_1.default(moduleDirectory);
        return files.filter(file => __filename.endsWith(".ts") ? file.endsWith(".ts") : file.endsWith(".js"));
    }
    static initialize() {
        const structuresDirectory = path.resolve("./structures/");
        if (fs.existsSync(structuresDirectory)) {
            const files = TesseractStructureManager.resolveModules(structuresDirectory);
            for (const file of files) {
                discord_js_1.Structures.extend(path.basename(file).slice(0, -3), () => require(file));
            }
        }
    }
}
exports.default = TesseractStructureManager;
//# sourceMappingURL=TesseractStructureManager.js.map