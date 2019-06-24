import TesseractModuleManager from "../TesseractModuleManager";
import TesseractClient from "../client/TesseractClient";
declare class CommandManager extends TesseractModuleManager {
    prefixes: string[];
    defaultCooldown: number;
    constructor(client: TesseractClient);
    private initialize;
    private handle;
    private parseCommandTrigger;
}
export default CommandManager;
//# sourceMappingURL=CommandModuleManager.d.ts.map