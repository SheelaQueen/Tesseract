import * as sequelize from "sequelize";

import Provider from "./Provider";


export interface SQLiteOptions {
    uri: string;
    logging?: boolean;
}


/**
 * Tesseract DataStore manager for SQLite
 */
export default class SQLiteProvider extends Provider {
    public db: sequelize.Sequelize;

    constructor(options: SQLiteOptions) {
        super();

        this.db = new sequelize.Sequelize(options.uri, {
            logging: options.logging,
        });
    }

    public connect = (): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            this.db.authenticate()
                .then(() => resolve(true))
                .catch((e: Error) => reject(e));
        });
    };

    public disconnect = (): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            this.db.close()
                .then(() => resolve(true))
                .catch((e: Error) => reject(e));
        });
    };
}
