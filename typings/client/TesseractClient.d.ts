/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 */
import { Client, ClientOptions } from "discord.js";
import TesseractClientUtils from "./TesseractClientUtils";
import DataStoreManager from "../datastore/DataStoreManager";
import InterruptModuleManager from "../interrupters/InterruptModuleManager";
import * as settings from "../utils/settings";
declare class TesseractClient extends Client {
    configurations: settings.ITesseractConfigurations;
    credentials: settings.ITesseractCredentials;
    utils: TesseractClientUtils;
    interrupter: InterruptModuleManager;
    dataStore: DataStoreManager;
    constructor(options?: ClientOptions);
    loadSettings(): void;
    connectDataStore(): Promise<void>;
    login(token?: string): Promise<string>;
    toString(): string;
}
export default TesseractClient;
//# sourceMappingURL=TesseractClient.d.ts.map