"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const SQLiteProvider_1 = require("./providers/SQLiteProvider");
;
class DataStoreManager {
    constructor(options) {
        switch (options.dialect) {
            case "sqlite":
                this.provider = sequelize;
                this.store = new SQLiteProvider_1.default(options.providerOptions);
                break;
        }
    }
}
exports.default = DataStoreManager;
;
//# sourceMappingURL=DataStoreManager.js.map