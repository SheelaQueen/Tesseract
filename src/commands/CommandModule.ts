import { PermissionResolvable, Message } from "discord.js";
import { Options as ArgumentParserOptions, Arguments as CommandArguments } from "yargs-parser";

import TesseractModule from "../TesseractModule";


interface CommandModuleOptions {
    /** The description of the command. */
    description?: string;
    /** The name and aliases for the command that can trigger this command. */
    triggers?: string[];
    /** Arguments configuration options for the arguments accepted by the command. */
    arguments?: ArgumentParserOptions;
    /** Execution scope of the command. Channel types where the command can be executed. */
    scope?: "guild" | "dm";
    /** Whether or not this command is only executable by the Tesseract client owner(s). */
    owner?: boolean;
    /** Whether or not to show 'typing...' status during command execution. */
    typing?: boolean;
    /** The cooldown period for the command (in milliseconds). */
    cooldown?: number;
    /** The number of times this command can be executed in the cooldown period. */
    ratelimit?: number;
    /** Permissions required by the Tesseract client to run this command. */
    clientPermissions?: PermissionResolvable[];
    /** Permissions required by the users to run this command. */
    userPermissions?: PermissionResolvable[];
    /** Any pre-run checks for the command. The command will execute only if this returns true. */
    condition?: Function;
}

/**
 * Abstract class for creating Tesseract client commands.
 */
abstract class CommandModule extends TesseractModule {
    /** The description of the command. */
    description: string;
    /** The name and aliases for the command that can trigger this command. */
    triggers: string[];
    /** Arguments configuration options for the arguments accepted by the command. */
    arguments: ArgumentParserOptions;
    /** Execution scope of the command. Channel types where the command can be executed. */
    scope: "guild" | "dm";
    /** Whether or not this command is only executable by the Tesseract client owner(s). */
    owner: boolean;
    /** Whether or not to show 'typing...' status during command execution. */
    typing: boolean;
    /** The cooldown period for the command (in milliseconds). */
    cooldown: number;
    /** The number of times this command can be executed in the cooldown period. */
    ratelimit: number;
    /** Permissions required by the Tesseract client to run this command. */
    clientPermissions: PermissionResolvable[];
    /** Permissions required by the users to run this command. */
    userPermissions: PermissionResolvable[];
    /** Any pre-run checks for the command. The command will execute only if this returns true. */
    condition: Function;

    constructor(name: string, options: CommandModuleOptions = {}) {
        super(name);

        this.name = name;
        this.description = options.description || "";
        this.triggers = options.triggers || [ name ];
        this.arguments = options.arguments || {};
        this.scope = options.scope || "guild";
        this.owner = options.owner || false;
        this.typing = options.typing || false;
        this.cooldown = options.cooldown || 0;
        this.ratelimit = options.ratelimit || 0;
        this.clientPermissions = options.clientPermissions || [];
        this.userPermissions = options.userPermissions || [];
        this.condition = options.condition ? options.condition.bind(this) : (): boolean => true;
    }

    public abstract exec(message: Message, argv: CommandArguments): Promise<unknown>;
}


export default CommandModule;
