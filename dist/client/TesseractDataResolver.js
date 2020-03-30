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
    resolveGuildChannels(guild, channels, types) {
        const resolvedRoles = [];
        for (const c of channels) {
            const channel = this.resolveGuildChannel(guild, c, types);
            if (channel)
                resolvedRoles.push(channel);
        }
        return resolvedRoles;
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
    resolveGuildMembers(guild, users) {
        const resolvedMembers = [];
        for (const u of users) {
            const member = this.resolveGuildMember(guild, u);
            if (member)
                resolvedMembers.push(member);
        }
        return resolvedMembers;
    }
    resolveRole(guild, role) {
        if (role instanceof discord.Role)
            return role;
        guild = this.resolveGuild(guild);
        if (guild && typeof role === "string")
            return guild.roles.cache.get(role) || guild.roles.cache.find(r => r.name === role);
        return null;
    }
    resolveRoles(guild, roles) {
        const resolvedRoles = [];
        for (const r of roles) {
            const role = this.resolveRole(guild, r);
            if (role)
                resolvedRoles.push(role);
        }
        return resolvedRoles;
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
    resolveUsers(users) {
        const resolvedUsers = [];
        for (const u of users) {
            const user = this.resolveUser(u);
            if (user)
                resolvedUsers.push(user);
        }
        return resolvedUsers;
    }
}
exports.default = TesseractDataResolver;
//# sourceMappingURL=TesseractDataResolver.js.map