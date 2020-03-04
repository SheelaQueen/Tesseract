"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
class WebServer {
    constructor(manager) {
        this.manager = manager;
        this.requestListener = (_, res) => {
            this.manager.broadcastEval(`({
                shard: this.shard.id,
                uptime: this.uptime,
                wsStatus: this.ws.status,
                wsPing: this.ws.ping,
                guildCount: this.guilds.cache.size,
            })`)
                .then(result => {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.write(JSON.stringify(result));
                res.end();
            })
                .catch(() => {
                res.writeHead(500, {
                    "Content-Type": "application/json"
                });
                res.write(JSON.stringify({
                    status: 500,
                    message: "Internal Server Error"
                }));
                res.end();
            });
        };
        this.server = http.createServer(this.requestListener);
    }
    start(port = 8377) {
        this.server.listen(port);
    }
}
exports.default = WebServer;
//# sourceMappingURL=WebServer.js.map