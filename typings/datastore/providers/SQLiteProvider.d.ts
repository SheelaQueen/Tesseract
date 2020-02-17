import * as sequelize from "sequelize";
import Provider from "./Provider";
export interface ISQLiteOptions {
    uri: string;
    logging?: boolean;
}
export default class SQLiteProvider extends Provider {
    db: sequelize.Sequelize;
    constructor(options: ISQLiteOptions);
    connect: () => Promise<any>;
    disconnect: () => Promise<any>;
}
//# sourceMappingURL=SQLiteProvider.d.ts.map