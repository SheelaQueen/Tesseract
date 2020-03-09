"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lzutf8 = require("lzutf8");
class TesseractClientUtils {
    constructor(client) {
        this.client = client;
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
}
exports.default = TesseractClientUtils;
//# sourceMappingURL=TesseractClientUtils.js.map