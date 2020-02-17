import * as sequelize from "sequelize";
export default abstract class Provider {
    abstract db: sequelize.Sequelize;
    abstract connect(): Promise<any>;
    abstract disconnect(): Promise<any>;
}
//# sourceMappingURL=Provider.d.ts.map