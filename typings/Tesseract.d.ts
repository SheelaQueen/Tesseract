/*!
 * @file The starting point of Tesseract, exposing the framework.
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
import TesseractClient from "./client/TesseractClient";
import ListenerModule from "./listeners/ListenerModule";
import CommandModule from "./commands/CommandModule";
import * as Constants from "./utils/Constants";
import { Shard, ShardClientUtil, ShardingManager, WebhookClient, Collection, Permissions, Snowflake, SnowflakeUtil, Util } from "discord.js";
export { TesseractClient as Client, ListenerModule as Listener, CommandModule as Command, Constants, Shard, ShardClientUtil, ShardingManager, WebhookClient, Collection, Permissions, Snowflake, SnowflakeUtil, Util };
//# sourceMappingURL=Tesseract.d.ts.map