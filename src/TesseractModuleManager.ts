import * as path from "path";
import { EventEmitter } from "events";
import { Collection } from "discord.js";

import TesseractClient from "./client/TesseractClient";
import TesseractModule from "./TesseractModule";
import walkDirectory from "./utils/walkDirectory";

interface TesseractModuleManagerOptions {
  directory: string;
}

/** Base class for Modules Manager in Tesseract. */
abstract class TesseractModuleManager extends EventEmitter {
  /** The Tesseract client in which this module manager will manage modules. */
  client: TesseractClient;
  /** Path to the directory which contains the modules managed by this manager. */
  directory: string;
  /** A collection of the modules managed by this manager. */
  modules: Collection<string, TesseractModule>;

  constructor(client: TesseractClient, options: TesseractModuleManagerOptions) {
    super();

    this.client = client;
    this.directory = options.directory;
    this.modules = new Collection();
  }

  /**
   * Assigns the client & manager to the specified module, binds its `exec`
   * method and stores the module in the manager.
   */
  protected registerModule(module: TesseractModule) {
    module.client = this.client;
    module.manager = this;
    module.exec = module.exec.bind(module);

    this.modules.set(module.name, module);
  }

  /** Loads the module from the specified file path. */
  protected loadModule(file: string) {
    const module: TesseractModule = new (require(file))();

    this.registerModule(module);
  }

  /** Loads all the modules that'll be managed by this manager. */
  public load() {
    const files = walkDirectory(path.resolve(this.directory));

    for (const file of files) this.loadModule(file);
  }
}

export default TesseractModuleManager;
