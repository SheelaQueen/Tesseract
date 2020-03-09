import { ShardingManager, ShardingManagerMode } from "discord.js";

import * as settings from "../utils/settings";


interface ShardingManagerOptions {
    totalShards?: number | "auto";
    shardList?: number[] | "auto";
    mode?: ShardingManagerMode;
    respawn?: boolean;
    shardArgs?: string[];
    token?: string;
    execArgv?: string[];
}

/**
 * Tesseract Sharding Manager
 */
class TesseractShardingManager extends ShardingManager {
    constructor(file: string, options?: ShardingManagerOptions) {
        super(file, options);

        const credentials = settings.getCredentials();

        this.token = credentials.token;
    }
}


export default TesseractShardingManager;
