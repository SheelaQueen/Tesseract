"use strict";
/*!
 * @file Constants Definitions
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.discord = discord_js_1.Constants;
const ArgumentTypes = {
    STRING: String,
    UPPERCASE: (arg) => arg.toUpperCase(),
    LOWERCASE: (arg) => arg.toLowerCase(),
    BOOLEAN: (arg) => {
        if (!arg)
            return false;
        if (arg.toLowerCase() === "false" || arg === "0")
            return false;
        return Boolean(arg);
    },
    NUMBER: (arg) => arg && !isNaN(Number(arg)) ? parseFloat(arg) : null,
    INTEGER: (arg) => arg && !isNaN(Number(arg)) ? parseInt(arg) : null,
    BIGINT: (arg) => arg && !isNaN(Number(arg)) ? BigInt(arg) : null,
    URL: (arg) => {
        try {
            return new URL(arg);
        }
        catch {
            return null;
        }
    },
    TIMESTAMP: (arg) => Date.parse(arg + "Z") || null,
    DATE: (arg) => {
        const timestamp = ArgumentTypes.TIMESTAMP(arg);
        if (timestamp && !isNaN(timestamp))
            return new Date(timestamp);
        return null;
    },
    COLOR: (arg) => {
        if (!arg)
            return null;
        const color = parseInt(arg.replace("#", ""), 16);
        if (color < 0 || color > 0xFFFFFF || isNaN(color))
            return null;
        return color;
    },
};
exports.ArgumentTypes = ArgumentTypes;
var LISTENER_MODE;
(function (LISTENER_MODE) {
    LISTENER_MODE[LISTENER_MODE["ON"] = 0] = "ON";
    LISTENER_MODE[LISTENER_MODE["ONCE"] = 1] = "ONCE";
})(LISTENER_MODE || (LISTENER_MODE = {}));
exports.LISTENER_MODE = LISTENER_MODE;
var MODULE_MANAGER_EVENTS;
(function (MODULE_MANAGER_EVENTS) {
    MODULE_MANAGER_EVENTS["COMMAND_MODULE_EXECUTE"] = "commandExecute";
    MODULE_MANAGER_EVENTS["COMMAND_MODULE_HELP"] = "commandHelp";
})(MODULE_MANAGER_EVENTS || (MODULE_MANAGER_EVENTS = {}));
exports.MODULE_MANAGER_EVENTS = MODULE_MANAGER_EVENTS;
var MODULE_EXECUTE_STATUS;
(function (MODULE_EXECUTE_STATUS) {
    MODULE_EXECUTE_STATUS["SUCCESS"] = "success";
    MODULE_EXECUTE_STATUS["FAILED"] = "failed";
})(MODULE_EXECUTE_STATUS || (MODULE_EXECUTE_STATUS = {}));
exports.MODULE_EXECUTE_STATUS = MODULE_EXECUTE_STATUS;
var COLORS;
(function (COLORS) {
    COLORS[COLORS["IRIS"] = 4244731] = "IRIS";
    COLORS[COLORS["PUPIL"] = 6478331] = "PUPIL";
    COLORS[COLORS["LIGHT"] = 16119285] = "LIGHT";
    COLORS[COLORS["SOMEWHAT_DARK"] = 2303786] = "SOMEWHAT_DARK";
    COLORS[COLORS["DARK_BUT_NOT_BLACK"] = 790033] = "DARK_BUT_NOT_BLACK";
    COLORS[COLORS["NOT_SO_BLACK"] = 461324] = "NOT_SO_BLACK";
    COLORS[COLORS["BLUE"] = 31487] = "BLUE";
    COLORS[COLORS["GREEN"] = 3458905] = "GREEN";
    COLORS[COLORS["INDIGO"] = 5789398] = "INDIGO";
    COLORS[COLORS["ORANGE"] = 16749824] = "ORANGE";
    COLORS[COLORS["PINK"] = 16723285] = "PINK";
    COLORS[COLORS["PURPLE"] = 11490014] = "PURPLE";
    COLORS[COLORS["RED"] = 16726832] = "RED";
    COLORS[COLORS["TEAL"] = 5949690] = "TEAL";
    COLORS[COLORS["YELLOW"] = 16763904] = "YELLOW";
})(COLORS || (COLORS = {}));
exports.COLORS = COLORS;
//# sourceMappingURL=Constants.js.map