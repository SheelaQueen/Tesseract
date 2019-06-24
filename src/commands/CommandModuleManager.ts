import { Message } from "discord.js";
import yargsParser = require("yargs-parser");

import TesseractModuleManager from "../TesseractModuleManager";
import TesseractClient from "../client/TesseractClient";
import CommandModule from "./CommandModule";

interface ICommandTriggerObject {
  prefix: string;
  command: string;
  arguments: string;
}

/**
 * Command Module Manager loads commands and handles their execution based on
 * their specified parameters.
 */
class CommandManager extends TesseractModuleManager {
  prefixes: string[];
  defaultCooldown: number;

  constructor(client: TesseractClient) {
    super(client, { directory: "./commands/" });

    this.prefixes = client.configurations.prefixes;

    this.initialize();

    super.load();
  }

  private initialize() {
    this.client.once("ready", () => {
      this.client.on("message", (message: Message) => {
        if (message.author.bot) return;

        this.handle(message);
      });
    });
  }

  private async handle(message: Message): Promise<boolean> {
    // TODO: Support for all Command Module options
    if (message.guild && !message.member) {
      await message.guild.fetchMember(message.author);
    }

    // TODO: add support for guild prefixes
    let guildPrefixes: string[] = null;


    let commandTrigger: ICommandTriggerObject = this.parseCommandTrigger(message, guildPrefixes);

    if (!commandTrigger) {
      // This is not a command
      return false;
    }


    let command: CommandModule = this.modules.get(commandTrigger.command) as CommandModule;

    if (!command) {
      // This command doesn't exist
      return false;
    }


    // Check if user is bot owner
    if (command.owner && !this.client.credentials.owners.includes(message.author.id)) return false;

    if (message.guild) {
      // Check if the client has perms required for the command
      if (command.clientPermissions && !message.guild.me.permissionsIn(message.channel).has(command.clientPermissions)) return false;

      // Check if user has perms to run the commands
      if (command.userPermissions && !message.member.permissionsIn(message.channel).has(command.userPermissions)) return false;
    }

    // Check if Command condition is met
    if (!command.condition()) return false;


    let parsedArguments: yargsParser.Arguments = yargsParser(commandTrigger.arguments, command.arguments);
    parsedArguments._raw = commandTrigger.arguments;

    await command.exec(message, parsedArguments);

    return true;
  }

  /**
   * Parses a raw message content and returns the command trigger object.
   */
  private parseCommandTrigger(message: Message, guildPrefixes: string[]): ICommandTriggerObject {
    let prefixes: string[] = guildPrefixes && guildPrefixes.length ? guildPrefixes : this.prefixes;

    let triggerRegExp: RegExp = new RegExp("^(" + prefixes.join("|").replace(/[.*+?^${}()[\]\\]/g, "\\$&") + ")[a-z0-9]+");

    let trigger: RegExpMatchArray = message.content.match(triggerRegExp);
    if (!trigger) return null;

    let [ prefixedCommand, usedPrefix ] = trigger;

    let command: string = prefixedCommand.slice(usedPrefix.length).toLowerCase();
    let args: string = message.content.slice(prefixedCommand.length).trim();

    return {
      prefix: usedPrefix,
      command: command,
      arguments: args,
    }
  }
}

export default CommandManager;
