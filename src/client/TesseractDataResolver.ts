import * as discord from "discord.js";

import TesseractClient from "./TesseractClient";

/**
 * The TesseractDataResolver identifies different objects and tries to resolve
 * a specific piece of information from them.
 */
export default class TesseractDataResolver {
    /** The client this logger belongs to. */
    client: TesseractClient;

    constructor(client: TesseractClient) {
        this.client = client;
    }

    /** Resolves a Guild object. */
    resolveGuild(guild: discord.GuildResolvable): discord.Guild {
        if (typeof guild === "string") return this.client.guilds.cache.get(guild);
        if (guild instanceof discord.Guild) return guild;
        if (guild instanceof discord.GuildChannel || guild instanceof discord.GuildMember || guild instanceof discord.GuildEmoji || guild instanceof discord.Invite || guild instanceof discord.Role) return guild.guild;
        return null;
    }

    /** Resolves a GuildChannel object. */
    resolveGuildChannel(guild: discord.GuildResolvable, channel: discord.GuildChannelResolvable, types?: ("category" | "news" | "store" | "text" | "voice")[]): discord.GuildChannel {
        if (channel instanceof discord.GuildChannel) return channel;
        guild = this.resolveGuild(guild);
        if (guild && typeof channel === "string") {
            const channels = types ? guild.channels.cache.filter(c => types.includes(c.type)) : guild.channels.cache;
            return channels.get(channel) || channels.find(r => r.name === channel);
        }
        return null;
    }

    /** Resolves multiple GuildChannel objects. */
    resolveGuildChannels(guild: discord.GuildResolvable, channels: discord.GuildChannelResolvable[], types?: ("category" | "news" | "store" | "text" | "voice")[]): discord.GuildChannel[] {
        if (!channels) channels = [];
        const resolvedRoles: discord.GuildChannel[] = [];
        for (const c of channels) {
            const channel = this.resolveGuildChannel(guild, c, types);
            if (channel) resolvedRoles.push(channel);
        }
        return resolvedRoles;
    }

    /** Resolves a GuildMember object. */
    resolveGuildMember(guild: discord.GuildResolvable, user: discord.UserResolvable): discord.GuildMember {
        if (user instanceof discord.GuildMember) return user;
        guild = this.resolveGuild(guild);
        user = this.resolveUser(user);
        if (guild && user) return guild.members.cache.get(user.id);
        return null;
    }

    /** Resolves multiple GuildMember objects. */
    resolveGuildMembers(guild: discord.GuildResolvable, users: discord.UserResolvable[]): discord.GuildMember[] {
        if (!users) users = [];
        const resolvedMembers: discord.GuildMember[] = [];
        for (const u of users) {
            const member = this.resolveGuildMember(guild, u);
            if (member) resolvedMembers.push(member);
        }
        return resolvedMembers;
    }

    /** Resolves a Role object. */
    resolveRole(guild: discord.GuildResolvable, role: discord.RoleResolvable): discord.Role {
        if (role instanceof discord.Role) return role;
        guild = this.resolveGuild(guild);
        if (guild && typeof role === "string") return guild.roles.cache.get(role) || guild.roles.cache.find(r => r.name === role);
        return null;
    }

    /** Resolves multiple Role objects. */
    resolveRoles(guild: discord.GuildResolvable, roles: discord.RoleResolvable[]): discord.Role[] {
        if (!roles) roles = [];
        const resolvedRoles: discord.Role[] = [];
        for (const r of roles) {
            const role = this.resolveRole(guild, r);
            if (role) resolvedRoles.push(role);
        }
        return resolvedRoles;
    }

    /** Resolves a User object. */
    resolveUser(user: discord.UserResolvable): discord.User {
        if (typeof user === "string") return this.client.users.cache.get(user);
        if (user instanceof discord.Message) return user.author;
        if (user instanceof discord.GuildMember) return user.user;
        if (user instanceof discord.User) return user;
        return null;
    }

    /** Resolves multiple User objects. */
    resolveUsers(users: discord.UserResolvable[]): discord.User[] {
        if (!users) users = [];
        const resolvedUsers: discord.User[] = [];
        for (const u of users) {
            const user = this.resolveUser(u);
            if (user) resolvedUsers.push(user);
        }
        return resolvedUsers;
    }
}
