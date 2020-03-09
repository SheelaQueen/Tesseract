import * as mongoose from "mongoose";
import * as sequelize from "sequelize";
import SQLiteProvider, { SQLiteOptions } from "./providers/SQLiteProvider";
import MongoProvider, { MongoOptions } from "./providers/MongoProvider";
export interface DataStoreOptions {
    dialect: "mongodb" | "sqlite";
    providerOptions: MongoOptions | SQLiteOptions;
}
export default class DataStoreManager {
    provider: typeof mongoose | typeof sequelize;
    store: MongoProvider | SQLiteProvider;
    constructor(options: DataStoreOptions);
}
//# sourceMappingURL=DataStoreManager.d.ts.map