/// <reference types="node" />
import { EventEmitter } from "events";
import { Collection } from "discord.js";
import TesseractClient from "../client/TesseractClient";
import TesseractModuleManager from "../TesseractModuleManager";
import ListenerModule from "./ListenerModule";
declare class ListenerModuleManager extends TesseractModuleManager {
    emitters: Collection<string, EventEmitter>;
    constructor(client: TesseractClient);
    protected attachListener(listener: ListenerModule): void;
    protected initializeModule(listener: ListenerModule): ListenerModule;
}
export default ListenerModuleManager;
//# sourceMappingURL=ListenerModuleManager.d.ts.map