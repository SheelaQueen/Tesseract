import { Snowflake } from "discord.js";
import TesseractModuleManager from "../TesseractModuleManager";
import TesseractClient from "../client/TesseractClient";
import CommandModule from "./CommandModule";
declare class CommandManager extends TesseractModuleManager {
    prefixes: string[];
    triggers: Map<string, string>;
    guildCommandUses: Map<Snowflake, Map<string, Map<Snowflake, number>>>;
    defaultCooldown: number;
    constructor(client: TesseractClient);
    private initialize;
    protected storeModule(module: CommandModule): void;
    private handle;
    private parseCommandTrigger;
}
export default CommandManager;
//# sourceMappingURL=CommandModuleManager.d.ts.map