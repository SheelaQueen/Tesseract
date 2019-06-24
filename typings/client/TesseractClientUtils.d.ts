import { Guild, Snowflake, GuildMember } from "discord.js";
import TesseractClient from "./TesseractClient";
import TesseractDataResolver from "./TesseractDataResolver";
export default class TesseractClientUtils {
    client: TesseractClient;
    resolver: TesseractDataResolver;
    constructor(client: TesseractClient);
    compressString(string: string): Promise<string>;
    decompressString(string: string): Promise<string>;
    fetchMember(guild: Guild, id: Snowflake, cache?: boolean): Promise<GuildMember>;
}
//# sourceMappingURL=TesseractClientUtils.d.ts.map