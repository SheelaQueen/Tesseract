import { ChannelResolvable, Collection, Snowflake, Channel, Guild, GuildResolvable, UserResolvable, GuildMember, RoleResolvable, Role, User } from "discord.js";
import TesseractClient from "./TesseractClient";
export default class TesseractDataResolver {
    client: TesseractClient;
    constructor(client: TesseractClient);
    resolveChannel(channel: ChannelResolvable, channels: Collection<Snowflake, Channel>): Channel;
    resolveGuild(guild: GuildResolvable): Guild;
    resolveGuildMember(guild: GuildResolvable, user: UserResolvable): GuildMember;
    resolveRole(guild: GuildResolvable, role: RoleResolvable): Role;
    resolveUser(user: UserResolvable): User;
}
//# sourceMappingURL=TesseractDataResolver.d.ts.map