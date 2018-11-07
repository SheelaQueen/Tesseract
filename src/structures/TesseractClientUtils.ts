import * as discord from "discord.js";

import TesseractDataResolver from "./TesseractDataResolver";

// Utility class to help with common tasks.
export default class TesseractClientUtils {
  client: discord.Client;
  resolver: TesseractDataResolver;

  // TODO: Use TesseractClient
  constructor(client: discord.Client) {
    this.client = client;

    this.resolver = new TesseractDataResolver(this.client);
  }

  // Fetches a user from Discord and then fetches their membership in a guild.
  async fetchMember(guild: discord.Guild, id: discord.Snowflake, cache: boolean = true): Promise<discord.GuildMember> {
    let user = await this.client.fetchUser(id, cache);
    return guild.fetchMember(user, cache);
  }
};
