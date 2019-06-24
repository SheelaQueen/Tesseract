/// <reference types="node" />
import { EventEmitter } from "events";
import TesseractClient from "./client/TesseractClient";
import TesseractModuleManager from "./TesseractModuleManager";
declare abstract class TesseractModule extends EventEmitter {
    name: string;
    abstract client: TesseractClient;
    abstract manager: TesseractModuleManager;
    constructor(name: string);
    abstract exec(...args: any): Promise<any>;
    toString(): string;
}
export default TesseractModule;
//# sourceMappingURL=TesseractModule.d.ts.map