import * as sequelize from "sequelize";
import SQLiteProvider, { ISQLiteOptions } from "./providers/SQLiteProvider";


export interface IDataStoreOptions {
    dialect: "sqlite";
    providerOptions: ISQLiteOptions;
};


/**
 * Tesseract DataStoreManager manages database of the Tesseract client.
 */
export default class DataStoreManager {
    /** DataStore provider */
    provider: typeof sequelize;
    /** DataStore provider instance */
    store: SQLiteProvider;

    constructor(options: IDataStoreOptions) {
        switch (options.dialect) {
            case "sqlite":
                this.provider = sequelize;
                this.store = new SQLiteProvider(options.providerOptions);
                break;
        }
    }
};
