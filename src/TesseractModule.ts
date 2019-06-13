import { EventEmitter } from "events";

import TesseractClient from "./client/TesseractClient";
import TesseractModuleManager from "./TesseractModuleManager";

/** Base class for Modules in Tesseract. */
abstract class TesseractModule extends EventEmitter {
  /** The name of this module. */
  public name: string;
  /** The Tesseract client in which this module was loaded. */
  public abstract client: TesseractClient;
  /** The module manager that manages this module. */
  public abstract manager: TesseractModuleManager;

  constructor(name: string) {
    super();

    this.name = name;
  }

  /** The method that'll be executed when this module runs. */
  public abstract exec(): Promise<any>;

  public toString() {
    return this.name;
  }
}

export default TesseractModule;
