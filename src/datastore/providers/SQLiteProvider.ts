import * as sequelize from "sequelize";

import Provider from "./Provider";


export interface ISQLiteOptions {
    uri: string;
    logging?: boolean;
};


/**
 * Tesseract DataStore manager for SQLite
 * @singletone
 */
export default class SQLiteProvider extends Provider {
    public db: sequelize.Sequelize;

    constructor(options: ISQLiteOptions) {
        super();

        this.db = new sequelize.Sequelize(options.uri, {
            logging: options.logging,
        });
    }

    public connect = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.db.authenticate()
            .then(() => resolve(true))
            .catch((e: any) => reject(e));
        });
    };

    public disconnect = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.db.close()
            .then(() => resolve(true))
            .catch((e: any) => reject(e));
        });
    };
};
