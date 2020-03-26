"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Provider_1 = require("./Provider");
class MongoProvider extends Provider_1.default {
    constructor(options) {
        super();
        this.connect = () => {
            return new Promise((resolve, reject) => {
                this.db.connect(this.options.uri, {
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                    .then(() => resolve(true))
                    .catch((e) => reject(e));
            });
        };
        this.disconnect = () => {
            return new Promise((resolve, reject) => {
                this.db.connection.close()
                    .then(() => resolve(true))
                    .catch((e) => reject(e));
            });
        };
        this.db = mongoose;
        this.options = options;
    }
}
exports.default = MongoProvider;
//# sourceMappingURL=MongoProvider.js.map