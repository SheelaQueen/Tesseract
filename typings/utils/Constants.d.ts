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
export { Constants as discord, ArgumentTypes, LISTENER_MODE, };
//# sourceMappingURL=Constants.d.ts.map