"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lzutf8 = require("lzutf8");
const TesseractDataResolver_1 = require("./TesseractDataResolver");
class TesseractClientUtils {
    constructor(client) {
        this.client = client;
        this.resolver = new TesseractDataResolver_1.default(this.client);
    }
    compressString(string) {
        return new Promise((resolve, reject) => {
            lzutf8.compressAsync(string.toString(), { outputEncoding: "StorageBinaryString" }, (res, err) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
    decompressString(string) {
        return new Promise((resolve, reject) => {
            lzutf8.decompressAsync(string.toString(), { inputEncoding: "StorageBinaryString" }, (res, err) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
    async fetchMember(guild, id, cache = true) {
        let user = await this.client.fetchUser(id, cache);
        return guild.fetchMember(user, cache);
    }
}
exports.default = TesseractClientUtils;
;
//# sourceMappingURL=TesseractClientUtils.js.map