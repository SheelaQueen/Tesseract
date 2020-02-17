import * as mongoose from "mongoose";
import * as sequelize from "sequelize";
import SQLiteProvider, { ISQLiteOptions } from "./providers/SQLiteProvider";
import MongoProvider, { IMongoOptions } from "./providers/MongoProvider";
export interface IDataStoreOptions {
    dialect: "mongodb" | "sqlite";
    providerOptions: IMongoOptions | ISQLiteOptions;
}
export default class DataStoreManager {
    provider: typeof mongoose | typeof sequelize;
    store: MongoProvider | SQLiteProvider;
    constructor(options: IDataStoreOptions);
}
//# sourceMappingURL=DataStoreManager.d.ts.map