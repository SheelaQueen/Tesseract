import { ShardingManager } from "discord.js";
declare class WebServer {
    private manager;
    private requestListener;
    private server;
    constructor(manager: ShardingManager);
    start(port?: number): void;
}
export default WebServer;
//# sourceMappingURL=WebServer.d.ts.map