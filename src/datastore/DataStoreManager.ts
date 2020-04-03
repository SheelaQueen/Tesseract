import * as mongoose from "mongoose";

export interface DataStoreOptions {
    uri: string;
}

/**
 * Tesseract DataStoreManager manages database of the Tesseract client.
 */
export default class DataStoreManager {
    db: mongoose.Mongoose;
    options: DataStoreOptions;

    constructor(options: DataStoreOptions) {
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
