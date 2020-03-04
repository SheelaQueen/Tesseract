import * as http from "http";
import { ShardingManager } from "discord.js";


/**
 * Tesseract Web Server
 */
class WebServer {
    private manager: ShardingManager;
    private requestListener: http.RequestListener;
    private server: http.Server;

    constructor(manager: ShardingManager) {
        this.manager = manager;

        this.requestListener = (_, res) => {
            this.manager.broadcastEval(`({
                shard: this.shard.id,
                uptime: this.uptime,
                wsStatus: this.ws.status,
                wsPing: this.ws.ping,
                guildCount: this.guilds.cache.size,
            })`)
            .then(result  => {
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

    /** Start listening for requests on the specified port */
    public start(port: number = 8377) {
        this.server.listen(port);
    }
}


export default WebServer;
