import * as discord from "discord.js";
export default class TesseractClientUtils {
    client: discord.Client;
    constructor(client: discord.Client);
    fetchMember(guild: discord.Guild, id: discord.Snowflake, cache?: boolean): Promise<discord.GuildMember>;
}
//# sourceMappingURL=TesseractClientUtils.d.ts.map