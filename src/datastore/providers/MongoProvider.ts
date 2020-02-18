import * as mongoose from "mongoose";

import Provider from "./Provider";


export interface IMongoOptions {
    uri: string;
};


/**
 * Tesseract DataStore manager for MongoDB
 */
export default class MongoProvider extends Provider {
    public db: mongoose.Mongoose;
    public options: IMongoOptions;

    constructor(options: IMongoOptions) {
        super();

        this.db = mongoose;
        this.options = options;
    }

    public connect = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.db.connect(this.options.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => resolve(true))
            .catch((e: any) => reject(e));
        });
    };

    public disconnect = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.db.connection.close()
            .then(() => resolve(true))
            .catch((e: any) => reject(e));
        });
    };
};
