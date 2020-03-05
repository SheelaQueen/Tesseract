"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const Provider_1 = require("./Provider");
;
class SQLiteProvider extends Provider_1.default {
    constructor(options) {
        super();
        this.connect = () => {
            return new Promise((resolve, reject) => {
                this.db.authenticate()
                    .then(() => resolve(true))
                    .catch((e) => reject(e));
            });
        };
        this.disconnect = () => {
            return new Promise((resolve, reject) => {
                this.db.close()
                    .then(() => resolve(true))
                    .catch((e) => reject(e));
            });
        };
        this.db = new sequelize.Sequelize(options.uri, {
            logging: options.logging,
        });
    }
}
exports.default = SQLiteProvider;
;
//# sourceMappingURL=SQLiteProvider.js.map