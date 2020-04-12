"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargsParser = require("yargs-parser");
const discord_js_1 = require("discord.js");
const TesseractModuleManager_1 = require("../TesseractModuleManager");
const Constants_1 = require("../utils/Constants");
class CommandManager extends TesseractModuleManager_1.default {
    constructor(client) {
        super(client, { directory: "./commands/" });
        this.prefixes = client.configurations.prefixes;
        this.triggers = new Map();
        this.guildCommandUses = new Map();
        this.initialize();
        super.load();
    }
    initialize() {
        this.client.once("ready", () => {
            this.client.on("message", (message) => {
                if (message.author.bot)
                    return;
                this.handle(message);
            });
        });
    }
    storeModule(module) {
        super.storeModule(module);
        for (const trigger of module.triggers) {
            this.triggers.set(trigger.toLowerCase(), module.name.toLowerCase());
        }
    }
    async handle(message) {
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
        Object.defineProperty(message.author, "document", {
            configurable: true,
            value: await this.client.dataStore.db.models.User.findByIdAndUpdate(message.author.id, {
                _id: message.author.id,
            }, {
                new: true,
                upsert: true,
            }),
        });
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
        this.emit(Constants_1.MODULE_MANAGER_EVENTS.HUMAN_MESSAGE, message);
        for (const interrupt of this.client.interrupter.modules.array()) {
            if (await interrupt.exec(message)) {
                return false;
            }
        }
        const guildPrefixes = ("document" in message.guild) ? [].concat(message.guild.document.prefixes) : [];
        const commandTrigger = this.parseCommandTrigger(message, guildPrefixes);
        if (!commandTrigger) {
            return false;
        }
        let command;
        if (this.modules.has(commandTrigger.command)) {
            command = this.modules.get(commandTrigger.command);
        }
        else if (this.triggers.has(commandTrigger.command)) {
            command = this.modules.get(this.triggers.get(commandTrigger.command));
        }
        if (!command) {
            return false;
        }
        switch (command.scope) {
            case "guild":
                if (!(message.channel instanceof discord_js_1.TextChannel))
                    return;
                break;
            case "dm":
                if (!(message.channel instanceof discord_js_1.DMChannel))
                    return;
                break;
        }
        if (command.owner && !this.client.credentials.owners.includes(message.author.id))
            return false;
        if (message.guild) {
            if (command.clientPermissions && !message.guild.me.permissionsIn(message.channel).has(command.clientPermissions))
                return false;
            if (command.userPermissions && !message.member.permissionsIn(message.channel).has(command.userPermissions))
                return false;
        }
        if (!command.condition())
            return false;
        if (command.cooldown && command.ratelimit) {
            if (!this.guildCommandUses.has(message.guild.id)) {
                this.guildCommandUses.set(message.guild.id, new Map());
            }
            if (!this.guildCommandUses.get(message.guild.id).has(command.name)) {
                this.guildCommandUses.get(message.guild.id).set(command.name, new Map());
            }
            let useCount = 0;
            if (this.guildCommandUses.get(message.guild.id).get(command.name).has(message.author.id)) {
                useCount = this.guildCommandUses.get(message.guild.id).get(command.name).get(message.author.id) || 0;
            }
            if (useCount >= command.ratelimit) {
                return;
            }
            this.guildCommandUses.get(message.guild.id).get(command.name).set(message.author.id, useCount + 1);
            this.client.setTimeout(() => {
                this.guildCommandUses.get(message.guild.id).get(command.name).delete(message.author.id);
            }, command.cooldown * 1000);
        }
        const parsedArguments = yargsParser(commandTrigger.arguments, command.arguments);
        parsedArguments._raw = commandTrigger.arguments;
        if (parsedArguments.help) {
            return this.emit(Constants_1.MODULE_MANAGER_EVENTS.COMMAND_MODULE_HELP, message, command);
        }
        if (command.typing)
            message.channel.startTyping().catch(() => {
            });
        await command.exec(message, parsedArguments)
            .then(() => this.emit(Constants_1.MODULE_MANAGER_EVENTS.COMMAND_MODULE_EXECUTE, this, Constants_1.MODULE_EXECUTE_STATUS.SUCCESS, command, message))
            .catch((e) => this.emit(Constants_1.MODULE_MANAGER_EVENTS.COMMAND_MODULE_EXECUTE, this, Constants_1.MODULE_EXECUTE_STATUS.FAILED, command, message, e));
        if (command.typing)
            message.channel.stopTyping();
        return true;
    }
    parseCommandTrigger(message, guildPrefixes = []) {
        const prefixes = guildPrefixes && guildPrefixes.length ? guildPrefixes : this.prefixes;
        const triggerRegExp = new RegExp("^(" + prefixes.join("|").replace(/[.*+?^${}()[\]\\]/g, "\\$&") + ")[a-z0-9]+(?:$| )", "i");
        const trigger = message.content.match(triggerRegExp);
        if (!trigger)
            return null;
        const [prefixedCommand, usedPrefix] = trigger;
        const command = prefixedCommand.slice(usedPrefix.length).toLowerCase().trim();
        const args = message.content.slice(prefixedCommand.length).trim();
        return {
            prefix: usedPrefix,
            command: command,
            arguments: args,
        };
    }
}
exports.default = CommandManager;
//# sourceMappingURL=CommandModuleManager.js.map