﻿"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class TesseractDataResolver {
    constructor(client) {
        this.client = client;
    }
    resolveChannel(channel) {
        if (channel instanceof discord.Channel)
            return channel;
        if (typeof channel === "string")
            return this.client.channels.get(channel) || null;
        if (channel instanceof discord.Message)
            return channel.channel;
        if (channel instanceof discord.Guild)
            return channel.channels.get(channel.id) || null;
        return null;
    }
    resolveGuild(guild) {
        if (guild instanceof discord.Guild)
            return guild;
        if (typeof guild === "string")
            return this.client.guilds.get(guild) || null;
        return null;
    }
    resolveGuildMember(guild, user) {
        if (user instanceof discord.GuildMember)
            return user;
        guild = this.resolveGuild(guild);
        user = this.resolveUser(user);
        if (!guild || !user)
            return null;
        return guild.members.get(user.id) || null;
    }
    resolveRole(guild, role) {
        if (role instanceof discord.Role)
            return role;
        guild = this.resolveGuild(guild);
        if (!guild)
            return null;
        if (typeof role === "string")
            return guild.roles.get(role);
        return null;
    }
    resolveUser(user) {
        if (user instanceof discord.User)
            return user;
        if (user instanceof discord.GuildMember)
            return user.user;
        if (user instanceof discord.Message)
            return user.author;
        if (user instanceof discord.Guild)
            return user.owner.user;
        if (typeof user === "string")
            return this.client.users.get(user) || null;
        return null;
    }
}
exports.default = TesseractDataResolver;
;
//# sourceMappingURL=TesseractDataResolver.js.map