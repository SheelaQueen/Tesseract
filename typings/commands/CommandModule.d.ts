import { PermissionResolvable, Message } from "discord.js";
import { Options as ArgumentParserOptions, Arguments as CommandArguments } from "yargs-parser";
import TesseractModule from "../TesseractModule";
interface ICommandModuleOptions {
    description?: string;
    triggers?: string[];
    arguments?: ArgumentParserOptions;
    scope?: "guild" | "dm";
    owner?: boolean;
    typing?: boolean;
    cooldown?: number;
    ratelimit?: number;
    clientPermissions?: PermissionResolvable[];
    userPermissions?: PermissionResolvable[];
    condition?: Function;
}
declare abstract class CommandModule extends TesseractModule {
    description: string;
    triggers: string[];
    arguments: ArgumentParserOptions;
    scope: "guild" | "dm";
    owner: boolean;
    typing: boolean;
    cooldown: number;
    ratelimit: number;
    clientPermissions: PermissionResolvable[];
    userPermissions: PermissionResolvable[];
    condition: Function;
    constructor(name: string, options?: ICommandModuleOptions);
    exec(message: Message, argv: CommandArguments): Promise<any>;
}
export default CommandModule;
//# sourceMappingURL=CommandModule.d.ts.map