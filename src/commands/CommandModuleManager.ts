import yargsParser = require("yargs-parser");
import { DMChannel, Message, TextChannel } from "discord.js";

import TesseractModuleManager from "../TesseractModuleManager";
import TesseractClient from "../client/TesseractClient";
import CommandModule from "./CommandModule";
import InterruptModule from "../interrupters/InterruptModule";

interface CommandTriggerObject {
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
    triggers: Map<string, string>;
    defaultCooldown: number;

    constructor(client: TesseractClient) {
        super(client, { directory: "./commands/" });

        this.prefixes = client.configurations.prefixes;
        this.triggers = new Map<string, string>();

        this.initialize();

        super.load();
    }

    private initialize(): void {
        this.client.once("ready", () => {
            this.client.on("message", (message: Message) => {
                if (message.author.bot) return;

                this.handle(message);
            });
        });
    }

    protected storeModule(module: CommandModule): void {
        super.storeModule(module);

        for (const trigger of module.triggers) {
            this.triggers.set(trigger, module.name);
        }
    }

    private async handle(message: Message): Promise<boolean> {
        for (const interrupt of this.client.interrupter.modules.array() as InterruptModule[]) {
            if (await interrupt.exec(message)) {
                // TODO: interrupt callback?
                return false;
            }
        }

        // TODO: Support for all Command Module options
        if (message.guild && !message.member) {
            await message.client.users.fetch(message.author.id);
            await message.guild.members.fetch(message.author);
        }

        // TODO: add support for guild prefixes
        const guildPrefixes: string[] = [];


        const commandTrigger: CommandTriggerObject = this.parseCommandTrigger(message, guildPrefixes);

        if (!commandTrigger) {
            // This is not a command
            return false;
        }


        let command: CommandModule;
        if (this.modules.has(commandTrigger.command)) {
            command = this.modules.get(commandTrigger.command) as CommandModule;
        } else if (this.triggers.has(commandTrigger.command)) {
            command = this.modules.get(this.triggers.get(commandTrigger.command)) as CommandModule;
        }

        if (!command) {
            // This command doesn't exist
            return false;
        }


        // Check for command's scope
        switch (command.scope) {
        case "guild":
            if (!(message.channel instanceof TextChannel)) return;
            break;

        case "dm":
            if (!(message.channel instanceof DMChannel)) return;
            break;
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


        // Start a typing indicator before starting to execute the command
        if (command.typing) message.channel.startTyping().catch(() => {
            // We can happily ignore this error.
        });


        const parsedArguments: yargsParser.Arguments = yargsParser(commandTrigger.arguments, command.arguments);
        parsedArguments._raw = commandTrigger.arguments;

        await command.exec(message, parsedArguments);


        // Stop the typing indicator after executing the command
        if (command.typing) message.channel.startTyping().catch(() => {
            // We can happily ignore this error too!
        });


        return true;
    }

    /**
     * Parses a raw message content and returns the command trigger object.
     */
    private parseCommandTrigger(message: Message, guildPrefixes: string[] = []): CommandTriggerObject {
        const prefixes: string[] = guildPrefixes && guildPrefixes.length ? guildPrefixes : this.prefixes;

        const triggerRegExp = new RegExp("^(" + prefixes.join("|").replace(/[.*+?^${}()[\]\\]/g, "\\$&") + ")[a-z0-9]+(?:$| )");

        const trigger: RegExpMatchArray = message.content.match(triggerRegExp);
        if (!trigger) return null;

        const [ prefixedCommand, usedPrefix ] = trigger;

        const command: string = prefixedCommand.slice(usedPrefix.length).toLowerCase().trim();
        const args: string = message.content.slice(prefixedCommand.length).trim();

        return {
            prefix: usedPrefix,
            command: command,
            arguments: args,
        };
    }
}

export default CommandManager;
