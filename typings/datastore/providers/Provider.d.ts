import * as mongoose from "mongoose";
import * as sequelize from "sequelize";
export default abstract class Provider {
    abstract db: mongoose.Mongoose | sequelize.Sequelize;
    abstract connect(): Promise<unknown>;
    abstract disconnect(): Promise<unknown>;
}
//# sourceMappingURL=Provider.d.ts.map