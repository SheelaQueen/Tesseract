"use strict";
/*!
 * @file Constants Definitions
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
        let timestamp = ArgumentTypes.TIMESTAMP(arg);
        if (timestamp && !isNaN(timestamp))
            return new Date(timestamp);
        return null;
    },
    COLOR: (arg) => {
        if (!arg)
            return null;
        let color = parseInt(arg.replace("#", ""), 16);
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
;
let DefaultOptions = discord_js_1.Constants.DefaultOptions;
exports.DefaultOptions = DefaultOptions;
let ChannelTypes = discord_js_1.Constants.ChannelTypes;
exports.ChannelTypes = ChannelTypes;
let Events = discord_js_1.Constants.Events;
exports.Events = Events;
let ActivityTypes = discord_js_1.Constants.ActivityTypes;
exports.ActivityTypes = ActivityTypes;
let MessageTypes = discord_js_1.Constants.MessageTypes;
exports.MessageTypes = MessageTypes;
let DefaultAvatars = discord_js_1.Constants.DefaultAvatars;
exports.DefaultAvatars = DefaultAvatars;
let Colors = discord_js_1.Constants.Colors;
exports.Colors = Colors;
let DiscordAPIErrors = discord_js_1.Constants.APIErrors;
exports.DiscordAPIErrors = DiscordAPIErrors;
//# sourceMappingURL=Constants.js.map