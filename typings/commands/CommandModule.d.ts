import { PermissionResolvable, Message } from "discord.js";
import { Options as ArgumentParserOptions, Arguments as CommandArguments } from "yargs-parser";
import TesseractModule from "../TesseractModule";
interface CommandModuleOptions {
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
    syntax?: string[];
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
    syntax?: string[];
    condition: Function;
    constructor(name: string, options?: CommandModuleOptions);
    abstract exec(message: Message, argv: CommandArguments): Promise<unknown>;
}
export default CommandModule;
//# sourceMappingURL=CommandModule.d.ts.map