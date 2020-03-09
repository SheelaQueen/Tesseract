/// <reference types="node" />
import { EventEmitter } from "events";
import TesseractClient from "./client/TesseractClient";
import TesseractModuleManager from "./TesseractModuleManager";
declare abstract class TesseractModule extends EventEmitter {
    name: string;
    client: TesseractClient;
    manager: TesseractModuleManager;
    constructor(name: string);
    abstract exec(...args: unknown[]): Promise<unknown>;
    toString(): string;
}
export default TesseractModule;
//# sourceMappingURL=TesseractModule.d.ts.map