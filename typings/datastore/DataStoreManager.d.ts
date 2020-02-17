import * as sequelize from "sequelize";
import SQLiteProvider, { ISQLiteOptions } from "./providers/SQLiteProvider";
export interface IDataStoreOptions {
    dialect: "sqlite";
    providerOptions: ISQLiteOptions;
}
export default class DataStoreManager {
    provider: typeof sequelize;
    store: SQLiteProvider;
    constructor(options: IDataStoreOptions);
}
//# sourceMappingURL=DataStoreManager.d.ts.map