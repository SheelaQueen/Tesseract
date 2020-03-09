/*!
 * @file The starting point of Tesseract, exposing the framework.
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */

import TesseractClient from "./client/TesseractClient";
import InterruptModule from "./interrupters/InterruptModule";
import ListenerModule from "./listeners/ListenerModule";
import MonitorModule from "./monitors/MonitorModule";
import CommandModule from "./commands/CommandModule";
import ShardingManager from "./shard/ShardingManager";
import WebServer from "./servers/WebServer";
import * as Constants from "./utils/Constants";

import {
    Shard,
    ShardClientUtil,
    WebhookClient,
    Collection,
    Permissions,
    Snowflake,
    SnowflakeUtil,
    Util,
} from "discord.js";

export {
    TesseractClient as Client,
    InterruptModule as Interrupt,
    ListenerModule as Listener,
    MonitorModule as Monitor,
    CommandModule as Command,
    Constants,
    Shard,
    ShardClientUtil,
    ShardingManager,
    WebhookClient,
    Collection,
    Permissions,
    Snowflake,
    SnowflakeUtil,
    Util,
    WebServer,
};
