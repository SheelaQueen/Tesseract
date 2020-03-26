/*!
 * @file The starting point of Tesseract, exposing the framework.
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
import TesseractClient from "./client/TesseractClient";
import TesseractModuleManagerEvent from "./TesseractModuleManagerEvent";
import InterruptModule from "./interrupters/InterruptModule";
import ListenerModule from "./listeners/ListenerModule";
import MonitorModule from "./monitors/MonitorModule";
import CommandModule from "./commands/CommandModule";
import SchedulerModule from "./schedulers/SchedulerModule";
import ShardingManager from "./shard/ShardingManager";
import WebServer from "./servers/WebServer";
import * as Constants from "./utils/Constants";
import { Shard, ShardClientUtil, WebhookClient, Collection, Permissions, Snowflake, SnowflakeUtil, Util } from "discord.js";
import { Options as ArgumentParserOptions, Arguments as CommandArguments } from "yargs-parser";
export { TesseractClient as Client, TesseractModuleManagerEvent as ModuleManagerEvent, InterruptModule as Interrupt, ListenerModule as Listener, MonitorModule as Monitor, CommandModule as Command, SchedulerModule as Scheduler, Constants, Shard, ShardClientUtil, ShardingManager, WebhookClient, Collection, Permissions, Snowflake, SnowflakeUtil, Util, WebServer, ArgumentParserOptions, CommandArguments, };
//# sourceMappingURL=Tesseract.d.ts.map