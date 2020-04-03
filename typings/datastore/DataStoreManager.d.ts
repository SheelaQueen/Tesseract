import * as mongoose from "mongoose";
export interface DataStoreOptions {
    uri: string;
}
export default class DataStoreManager {
    db: mongoose.Mongoose;
    options: DataStoreOptions;
    constructor(options: DataStoreOptions);
    connect: () => Promise<unknown>;
    disconnect: () => Promise<unknown>;
}
//# sourceMappingURL=DataStoreManager.d.ts.map