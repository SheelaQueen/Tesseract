"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class TesseractDataResolver {
    constructor(client) {
        this.client = client;
    }
    resolveGuild(guild) {
        if (typeof guild === "string")
            return this.client.guilds.cache.get(guild);
        if (guild instanceof discord.Guild)
            return guild;
        if (guild instanceof discord.GuildChannel || guild instanceof discord.GuildMember || guild instanceof discord.GuildEmoji || guild instanceof discord.Invite || guild instanceof discord.Role)
            return guild.guild;
        return null;
    }
    resolveGuildChannel(guild, channel, types) {
        if (channel instanceof discord.GuildChannel)
            return channel;
        guild = this.resolveGuild(guild);
        if (guild && typeof channel === "string") {
            const channels = types ? guild.channels.cache.filter(c => types.includes(c.type)) : guild.channels.cache;
            return channels.get(channel) || channels.find(r => r.name === channel);
        }
        return null;
    }
    resolveGuildMember(guild, user) {
        if (user instanceof discord.GuildMember)
            return user;
        guild = this.resolveGuild(guild);
        user = this.resolveUser(user);
        if (guild && user)
            return guild.members.cache.get(user.id);
        return null;
    }
    resolveRole(guild, role) {
        if (role instanceof discord.Role)
            return role;
        guild = this.resolveGuild(guild);
        if (guild && typeof role === "string")
            return guild.roles.cache.get(role) || guild.roles.cache.find(r => r.name === role);
        return null;
    }
    resolveUser(user) {
        if (typeof user === "string")
            return this.client.users.cache.get(user);
        if (user instanceof discord.Message)
            return user.author;
        if (user instanceof discord.GuildMember)
            return user.user;
        if (user instanceof discord.User)
            return user;
        return null;
    }
}
exports.default = TesseractDataResolver;
//# sourceMappingURL=TesseractDataResolver.js.map