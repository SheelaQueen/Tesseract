import { ShardingManager, ShardingManagerMode } from "discord.js";
interface IShardingManagerOptions {
    totalShards?: number | "auto";
    shardList?: number[] | "auto";
    mode?: ShardingManagerMode;
    respawn?: boolean;
    shardArgs?: string[];
    token?: string;
    execArgv?: string[];
}
declare class TesseractShardingManager extends ShardingManager {
    constructor(file: string, options?: IShardingManagerOptions);
}
export default TesseractShardingManager;
//# sourceMappingURL=ShardingManager.d.ts.map