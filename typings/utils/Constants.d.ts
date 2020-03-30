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
export { Constants as discord, ArgumentTypes, LISTENER_MODE, MODULE_MANAGER_EVENTS, MODULE_EXECUTE_STATUS, };
//# sourceMappingURL=Constants.d.ts.map