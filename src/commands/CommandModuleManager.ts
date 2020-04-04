import yargsParser = require("yargs-parser");
import { DMChannel, Guild, Message, Snowflake, TextChannel } from "discord.js";

import TesseractModuleManager from "../TesseractModuleManager";
import TesseractClient from "../client/TesseractClient";
import CommandModule from "./CommandModule";
import InterruptModule from "../interrupters/InterruptModule";
import { MODULE_MANAGER_EVENTS, MODULE_EXECUTE_STATUS } from "../utils/Constants";


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
    guildCommandUses: Map<Snowflake, Map<string, Map<Snowflake, number>>>;
    defaultCooldown: number;

    constructor(client: TesseractClient) {
        super(client, { directory: "./commands/" });

        this.prefixes = client.configurations.prefixes;
        this.triggers = new Map<string, string>();
        this.guildCommandUses = new Map<Snowflake, Map<string, Map<Snowflake, number>>>();

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
            this.triggers.set(trigger.toLowerCase(), module.name.toLowerCase());
        }
    }

    private async handle(message: Message): Promise<boolean> {
        // Guild document
        if (message.guild) {
            Object.defineProperty(message.guild, "document", {
                configurable: true,
                value: await this.client.dataStore.db.models.Guild.findById(message.guild.id),
            });
        }

        if (message.guild && !message.member) {
            await message.client.users.fetch(message.author.id);
            await message.guild.members.fetch(message.author);
        }


        // Guild prefixes
        const guildPrefixes: string[] = ("document" in message.guild) ? [].concat((message.guild as Guild & { document: { prefixes: string[] }}).document.prefixes) : [];


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


        // User Document
        Object.defineProperty(message.author, "document", {
            configurable: true,
            value: await this.client.dataStore.db.models.User.findByIdAndUpdate(message.author.id, {
                _id: message.author.id,
            }, {
                new: true,
                upsert: true,
            }),
        });

        // Member document
        if (message.member) {
            Object.defineProperty(message.member, "document", {
                configurable: true,
                value: await this.client.dataStore.db.models.Member.findOneAndUpdate({
                    guild: message.guild.id,
                    user: message.author.id,
                }, {
                    guild: message.guild.id,
                    user: message.author.id,
                }, {
                    new: true,
                    upsert: true,
                }),
            });
        }


        // Interrupts
        for (const interrupt of this.client.interrupter.modules.array() as InterruptModule[]) {
            if (await interrupt.exec(message)) {
                return false;
            }
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


        // Command cooldown
        if (command.cooldown && command.ratelimit) {
            if (!this.guildCommandUses.has(message.guild.id)) {
                this.guildCommandUses.set(message.guild.id, new Map<string, Map<Snowflake, number>>());
            }

            if (!this.guildCommandUses.get(message.guild.id).has(command.name)) {
                this.guildCommandUses.get(message.guild.id).set(command.name, new Map<Snowflake, number>());
            }

            // Member's use count
            let useCount = 0;
            if (this.guildCommandUses.get(message.guild.id).get(command.name).has(message.author.id)) {
                useCount = this.guildCommandUses.get(message.guild.id).get(command.name).get(message.author.id) || 0;
            }

            // Check whether the member is rate limited
            if (useCount >= command.ratelimit) {
                return; // TODO: rate limit message?
            }

            // Increase the use count
            this.guildCommandUses.get(message.guild.id).get(command.name).set(message.author.id, useCount + 1);

            // Remove the member's rate limit
            this.client.setTimeout(() => {
                this.guildCommandUses.get(message.guild.id).get(command.name).delete(message.author.id);
            }, command.cooldown * 1000);
        }


        // Start a typing indicator before starting to execute the command
        if (command.typing) message.channel.startTyping().catch(() => {
            // We can happily ignore this error.
        });


        const parsedArguments: yargsParser.Arguments = yargsParser(commandTrigger.arguments, command.arguments);
        parsedArguments._raw = commandTrigger.arguments;

        await command.exec(message, parsedArguments)
            .then(() => this.emit(MODULE_MANAGER_EVENTS.COMMAND_MODULE_EXECUTE, this, MODULE_EXECUTE_STATUS.SUCCESS, command, message))
            .catch((e: Error) => this.emit(MODULE_MANAGER_EVENTS.COMMAND_MODULE_EXECUTE, this, MODULE_EXECUTE_STATUS.FAILED, command, message, e));


        // Stop the typing indicator after executing the command
        if (command.typing) message.channel.stopTyping();


        return true;
    }

    /**
     * Parses a raw message content and returns the command trigger object.
     */
    private parseCommandTrigger(message: Message, guildPrefixes: string[] = []): CommandTriggerObject {
        const prefixes: string[] = guildPrefixes && guildPrefixes.length ? guildPrefixes : this.prefixes;

        const triggerRegExp = new RegExp("^(" + prefixes.join("|").replace(/[.*+?^${}()[\]\\]/g, "\\$&") + ")[a-z0-9]+(?:$| )", "i");

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
