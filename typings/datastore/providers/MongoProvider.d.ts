import * as mongoose from "mongoose";
import Provider from "./Provider";
export interface IMongoOptions {
    uri: string;
}
export default class MongoProvider extends Provider {
    db: mongoose.Mongoose;
    options: IMongoOptions;
    constructor(options: IMongoOptions);
    connect: () => Promise<any>;
    disconnect: () => Promise<any>;
}
//# sourceMappingURL=MongoProvider.d.ts.map