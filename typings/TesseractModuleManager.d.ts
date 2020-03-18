/// <reference types="node" />
import { EventEmitter } from "events";
import { Collection } from "discord.js";
import TesseractClient from "./client/TesseractClient";
import TesseractModule from "./TesseractModule";
interface TesseractModuleManagerOptions {
    directory: string;
}
declare abstract class TesseractModuleManager extends EventEmitter {
    client: TesseractClient;
    directory: string;
    modules: Collection<string, TesseractModule>;
    constructor(client: TesseractClient, options: TesseractModuleManagerOptions);
    protected storeModule(module: TesseractModule): void;
    protected initializeModule(module: TesseractModule, category?: string): TesseractModule;
    protected loadModule(file: string, category?: string): TesseractModule;
    load(): void;
}
export default TesseractModuleManager;
//# sourceMappingURL=TesseractModuleManager.d.ts.map