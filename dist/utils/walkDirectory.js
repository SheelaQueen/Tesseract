"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const walkDirectory = (directory) => {
    const filepaths = [];
    (function walk(directory) {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const filepath = path.join(directory, file);
            if (fs.statSync(filepath).isDirectory())
                walk(filepath);
            else
                filepaths.push(filepath);
        }
    })(directory);
    return filepaths;
};
exports.default = walkDirectory;
//# sourceMappingURL=walkDirectory.js.map