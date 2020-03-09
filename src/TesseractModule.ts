import { EventEmitter } from "events";

import TesseractClient from "./client/TesseractClient";
import TesseractModuleManager from "./TesseractModuleManager";

/** Base class for Modules in Tesseract. */
abstract class TesseractModule extends EventEmitter {
    /** The name of this module. */
    public name: string;
    /** The Tesseract client in which this module was loaded. */
    public client: TesseractClient;
    /** The module manager that manages this module. */
    public manager: TesseractModuleManager;

    constructor(name: string) {
        super();

        this.name = name;
        this.client = null;
        this.manager = null;
    }

    /** The method that'll be executed when this module runs. */
    public abstract exec(...args: unknown[]): Promise<unknown>;

    public toString(): string {
        return this.name;
    }
}

export default TesseractModule;
