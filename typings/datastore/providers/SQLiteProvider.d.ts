import * as sequelize from "sequelize";
import Provider from "./Provider";
export interface SQLiteOptions {
    uri: string;
    logging?: boolean;
}
export default class SQLiteProvider extends Provider {
    db: sequelize.Sequelize;
    constructor(options: SQLiteOptions);
    connect: () => Promise<unknown>;
    disconnect: () => Promise<unknown>;
}
//# sourceMappingURL=SQLiteProvider.d.ts.map