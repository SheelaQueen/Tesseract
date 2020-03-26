import * as fs from "fs";
import * as path from "path";
import { EventEmitter } from "events";
import { Collection } from "discord.js";

import TesseractClient from "./client/TesseractClient";
import TesseractModule from "./TesseractModule";
import TesseractModuleManagerEvent from "./TesseractModuleManagerEvent";
import walkDirectory from "./utils/walkDirectory";


interface TesseractModuleManagerOptions {
    /** Path to the directory which contains the modules managed by this manager. */
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

        this.attachListeners();
    }

    /** Returns the path of all the modules in the specified directory. */
    private resolveModules(moduleDirectory: string): string[] {
        const files: string[] = walkDirectory(moduleDirectory);
        return files.filter(file => __filename.endsWith(".ts") ? file.endsWith(".ts") : file.endsWith(".js"));
    }

    /** Attach Tesseract Module Manager events' listeners to their respective manager. */
    private attachListeners(): void {
        const eventsDirectory: string = path.resolve("./events/");

        if (fs.existsSync(eventsDirectory)) {
            const files: string[] = this.resolveModules(eventsDirectory);

            for (const file of files) {
                const event: TesseractModuleManagerEvent = new (require(file))();
                this.on(event.name, event.exec);
            }
        }
    }

    /** Stores the module in the manager's collection. */
    protected storeModule(module: TesseractModule): void {
        this.modules.set(module.name.toLowerCase(), module);
    }

    /**
     * Assigns the client & manager properties and binds the `exec` method of the
     * specified module.
     */
    protected initializeModule(module: TesseractModule, category?: string): TesseractModule {
        module.category = category;
        module.client = this.client;
        module.manager = this;
        module.exec = module.exec.bind(module);

        return module;
    }

    /** Loads the module from the specified file path. */
    protected loadModule(file: string, category?: string): TesseractModule {
        const module: TesseractModule = new (require(file))();

        this.initializeModule(module, category);
        this.storeModule(module);

        return module;
    }

    /** Loads all the modules that'll be managed by this manager. */
    public load(): void {
        const moduleDirectory: string = path.resolve(this.directory);

        if (fs.existsSync(moduleDirectory)) {
            const files: string[] = this.resolveModules(moduleDirectory);

            for (const file of files) {
                const moduleCategory: string = path.dirname(path.relative(moduleDirectory, file));
                this.loadModule(file, moduleCategory === "." ? "" : moduleCategory);
            }
        }
    }
}

export default TesseractModuleManager;
