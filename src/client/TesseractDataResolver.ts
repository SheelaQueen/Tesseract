import {
  ChannelResolvable,
  Collection,
  Snowflake,
  Channel,
  CategoryChannel,
  TextChannel,
  VoiceChannel,
  Message,
  Guild,
  GuildResolvable,
  UserResolvable,
  GuildMember,
  RoleResolvable,
  Role,
  User,
} from "discord.js";

import TesseractClient from "./TesseractClient";

/**
 * The TesseractDataResolver identifies different objects and tries to resolve
 * a specific piece of information from them.
 */
export default class TesseractDataResolver {
  client: TesseractClient;

  constructor(client: TesseractClient) {
    this.client = client;
  }

  /**
   * Resolves a ChannelResolvable to a Channel object.
   */
  resolveChannel(channel: ChannelResolvable, channels: Collection<Snowflake, Channel>): Channel {
    if (!channels) channels = this.client.channels;

    if (channel instanceof Channel) return channel;

    if (typeof channel === "string")
      return channels.get(channel)
        || channels.filter(c => c.type === "category" || c.type === "text" || c.type === "voice")
            .find((c: CategoryChannel | TextChannel | VoiceChannel) => c.name === channel)
        || null;

    if (channel instanceof Message) return channel.channel;
    if (channel instanceof Guild) return channel.channels.get(channel.id) || null;
    return null;
  }

  /**
   * Resolves a GuildResolvable to a Guild object.
   */
  resolveGuild(guild: GuildResolvable): Guild {
    if (guild instanceof Guild) return guild;
    if (typeof guild === "string") return this.client.guilds.get(guild) || this.client.guilds.find(g => g.name === guild) || null;
    return null;
  }

  /**
   * Resolves a GuildMemberResolvable to a GuildMember object.
   */
  resolveGuildMember(guild: GuildResolvable, user: UserResolvable): GuildMember {
    if (user instanceof GuildMember) return user;
    guild = this.resolveGuild(guild);
    user = this.resolveUser(user);
    if (!guild || !user) return null;
    return guild.members.get(user.id) || null;
  }

  /**
   * Resolves a RoleResolvable to a Role object.
   */
  resolveRole(guild: GuildResolvable, role: RoleResolvable): Role {
    if (role instanceof Role) return role;
    guild = this.resolveGuild(guild);
    if (!guild) return null;
    if (typeof role === "string") return guild.roles.get(role) || guild.roles.find(r => r.name === role);
    return null;
  }

  /**
   * Resolves a UserResolvable to a User object.
   */
  resolveUser(user: UserResolvable): User {
    if (user instanceof User) return user;
    if (user instanceof GuildMember) return user.user;
    if (user instanceof Message) return user.author;
    if (user instanceof Guild) return user.owner.user;
    if (typeof user === "string") return this.client.users.get(user) || null;
    return null;
  }
};
