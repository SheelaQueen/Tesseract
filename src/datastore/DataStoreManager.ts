import * as mongoose from "mongoose";
import * as sequelize from "sequelize";
import SQLiteProvider, { SQLiteOptions } from "./providers/SQLiteProvider";
import MongoProvider, { MongoOptions } from "./providers/MongoProvider";


export interface DataStoreOptions {
    dialect: "mongodb" | "sqlite";
    providerOptions: MongoOptions | SQLiteOptions;
}


/**
 * Tesseract DataStoreManager manages database of the Tesseract client.
 */
export default class DataStoreManager {
    /** DataStore provider */
    provider: typeof mongoose | typeof sequelize;
    /** DataStore provider instance */
    store: MongoProvider | SQLiteProvider;

    constructor(options: DataStoreOptions) {
        switch (options.dialect) {
        case "mongodb":
            this.provider = mongoose;
            this.store = new MongoProvider(options.providerOptions);
            break;
        case "sqlite":
            this.provider = sequelize;
            this.store = new SQLiteProvider(options.providerOptions);
            break;
        default:
            throw new Error("Tesseract DataStore dialect is invalid.");
        }
    }
}
