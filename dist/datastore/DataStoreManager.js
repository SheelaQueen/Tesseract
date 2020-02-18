"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const sequelize = require("sequelize");
const SQLiteProvider_1 = require("./providers/SQLiteProvider");
const MongoProvider_1 = require("./providers/MongoProvider");
;
class DataStoreManager {
    constructor(options) {
        switch (options.dialect) {
            case "mongodb":
                this.provider = mongoose;
                this.store = new MongoProvider_1.default(options.providerOptions);
                break;
            case "sqlite":
                this.provider = sequelize;
                this.store = new SQLiteProvider_1.default(options.providerOptions);
                break;
            default:
                throw new Error("Tesseract DataStore dialect is invalid.");
        }
    }
}
exports.default = DataStoreManager;
;
//# sourceMappingURL=DataStoreManager.js.map