/*!
 * @file Constants Definitions
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
import { Constants } from "discord.js";
declare const ArgumentTypes: {
    STRING: StringConstructor;
    UPPERCASE: (arg: string) => string;
    LOWERCASE: (arg: string) => string;
    BOOLEAN: (arg: string) => boolean;
    NUMBER: (arg: string) => number;
    INTEGER: (arg: string) => number;
    BIGINT: (arg: string) => bigint;
    URL: (arg: string) => URL;
    TIMESTAMP: (arg: string) => number;
    DATE: (arg: string) => Date;
    COLOR: (arg: string) => number;
};
declare enum LISTENER_MODE {
    ON = 0,
    ONCE = 1
}
declare enum MODULE_MANAGER_EVENTS {
    COMMAND_MODULE_EXECUTE = "commandExecute"
}
declare enum MODULE_EXECUTE_STATUS {
    SUCCESS = "success",
    FAILED = "failed"
}
declare enum COLORS {
    IRIS = 4244731,
    PUPIL = 6478331,
    LIGHT = 16119285,
    SOMEWHAT_DARK = 2303786,
    DARK_BUT_NOT_BLACK = 790033,
    NOT_SO_BLACK = 461324,
    BLUE = 31487,
    GREEN = 3458905,
    INDIGO = 5789398,
    ORANGE = 16749824,
    PINK = 16723285,
    PURPLE = 11490014,
    RED = 16726832,
    TEAL = 5949690,
    YELLOW = 16763904
}
export { COLORS, Constants as discord, ArgumentTypes, LISTENER_MODE, MODULE_MANAGER_EVENTS, MODULE_EXECUTE_STATUS, };
//# sourceMappingURL=Constants.d.ts.map