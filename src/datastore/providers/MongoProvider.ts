import * as mongoose from "mongoose";

import Provider from "./Provider";


export interface MongoOptions {
    uri: string;
}


/**
 * Tesseract DataStore manager for MongoDB
 */
export default class MongoProvider extends Provider {
    public db: mongoose.Mongoose;
    public options: MongoOptions;

    constructor(options: MongoOptions) {
        super();

        this.db = mongoose;
        this.options = options;
    }

    public connect = (): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            this.db.connect(this.options.uri, {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
                .then(() => resolve(true))
                .catch((e: Error) => reject(e));
        });
    };

    public disconnect = (): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            this.db.connection.close()
                .then(() => resolve(true))
                .catch((e: Error) => reject(e));
        });
    };
}
