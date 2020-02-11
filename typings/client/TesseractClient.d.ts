/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 */
import { Client, ClientOptions } from "discord.js";
import TesseractClientUtils from "./TesseractClientUtils";
import InterruptModuleManager from "../interrupters/InterruptModuleManager";
interface ITesseractConfigurations {
    prefixes: string[];
}
interface ITesseractCredentials {
    owners: string[];
    token: string;
}
declare class TesseractClient extends Client {
    configurations: ITesseractConfigurations;
    credentials: ITesseractCredentials;
    utils: TesseractClientUtils;
    interrupter: InterruptModuleManager;
    constructor(options?: ClientOptions);
    private loadSettingsFile;
    loadSettings(): void;
    login(token?: string): Promise<string>;
    toString(): string;
}
export default TesseractClient;
//# sourceMappingURL=TesseractClient.d.ts.map