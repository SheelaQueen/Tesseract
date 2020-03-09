import * as mongoose from "mongoose";
import Provider from "./Provider";
export interface MongoOptions {
    uri: string;
}
export default class MongoProvider extends Provider {
    db: mongoose.Mongoose;
    options: MongoOptions;
    constructor(options: MongoOptions);
    connect: () => Promise<unknown>;
    disconnect: () => Promise<unknown>;
}
//# sourceMappingURL=MongoProvider.d.ts.map