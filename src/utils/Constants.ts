/*!
 * @file Constants Definitions
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */

import { Constants } from "discord.js";


const ArgumentTypes = {
    STRING: String,
    UPPERCASE: (arg: string): string => arg.toUpperCase(),
    LOWERCASE: (arg: string): string => arg.toLowerCase(),
    BOOLEAN: (arg: string): boolean => {
        if (!arg) return false;
        if (arg.toLowerCase() === "false" || arg === "0") return false;
        return Boolean(arg);
    },
    NUMBER: (arg: string): number => arg && !isNaN(Number(arg)) ? parseFloat(arg) : null,
    INTEGER: (arg: string): number => arg && !isNaN(Number(arg)) ? parseInt(arg) : null,
    BIGINT: (arg: string): bigint => arg && !isNaN(Number(arg)) ? BigInt(arg) : null,
    URL: (arg: string): URL => {
        try {
            return new URL(arg);
        } catch {
            return null;
        }
    },
    TIMESTAMP: (arg: string): number => Date.parse(arg + "Z") || null,
    DATE: (arg: string): Date => {
        const timestamp: number = ArgumentTypes.TIMESTAMP(arg);
        if (timestamp && !isNaN(timestamp)) return new Date(timestamp);
        return null;
    },
    COLOR: (arg: string): number => {
        if (!arg) return null;

        const color = parseInt(arg.replace("#", ""), 16);
        if (color < 0 || color > 0xFFFFFF || isNaN(color)) return null;

        return color;
    },
};

enum LISTENER_MODE {
    /** It's invoked every time the specified event is triggered. */
    ON,
    /**
     * One-time listener. Once the specified event is triggered, it will be
     * detached and then invoked.
     */
    ONCE,
}

enum MODULE_MANAGER_EVENTS {
    /** Command Module has been executed by its Module Manager. */
    COMMAND_MODULE_EXECUTE = "commandExecute",
    /** Command Module has been executed with the `--help` argument. */
    COMMAND_MODULE_HELP = "commandHelp",
    /** A Message was received from a Human. */
    HUMAN_MESSAGE = "humanMessage",
}

enum MODULE_EXECUTE_STATUS {
    /** Module has been successfully executed. */
    SUCCESS = "success",
    /** Module has been executed, but with errors. */
    FAILED = "failed",
}

enum COLORS {
    IRIS = 0x40c4fb,
    PUPIL = 0x62d9fb,
    LIGHT = 0xf5f5f5,
    SOMEWHAT_DARK = 0x23272a,
    DARK_BUT_NOT_BLACK = 0x0c0e11,
    NOT_SO_BLACK = 0x070a0c,
    BLUE = 0x007aff,
    GREEN = 0x34c759,
    INDIGO = 0x5856d6,
    ORANGE = 0xff9500,
    PINK = 0xFF2D55,
    PURPLE = 0xaf52de,
    RED = 0xff3b30,
    TEAL = 0x5ac8fa,
    YELLOW = 0xffcc00,
}


export {
    COLORS,
    Constants as discord,
    ArgumentTypes,
    LISTENER_MODE,
    MODULE_MANAGER_EVENTS,
    MODULE_EXECUTE_STATUS,
};
