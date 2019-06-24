/*!
 * @file Constants Definitions
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
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
declare let DefaultOptions: any;
declare let ChannelTypes: any;
declare let Events: any;
declare let ActivityTypes: any;
declare let MessageTypes: any;
declare let DefaultAvatars: any;
declare let Colors: any;
declare let DiscordAPIErrors: any;
export { ArgumentTypes, LISTENER_MODE, DefaultOptions, ChannelTypes, Events, ActivityTypes, MessageTypes, DefaultAvatars, Colors, DiscordAPIErrors };
//# sourceMappingURL=Constants.d.ts.map