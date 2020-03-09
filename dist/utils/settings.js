"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const loadFile = (file, directory = path.resolve("./settings/")) => {
    const filePath = path.join(directory, file + ".yaml");
    const settings = fs.readFileSync(filePath, "utf8");
    return YAML.parse(settings);
};
exports.getConfigurations = () => {
    return loadFile("configurations");
};
exports.getCredentials = () => {
    return loadFile("credentials");
};
//# sourceMappingURL=settings.js.map