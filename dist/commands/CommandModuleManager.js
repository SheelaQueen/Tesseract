"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargsParser = require("yargs-parser");
const discord_js_1 = require("discord.js");
const TesseractModuleManager_1 = require("../TesseractModuleManager");
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
            this.triggers.set(trigger, module.name);
        }
    }
    async handle(message) {
        for (const interrupt of this.client.interrupter.modules.array()) {
            if (await interrupt.exec(message)) {
                return false;
            }
        }
        if (message.guild && !message.member) {
            await message.client.users.fetch(message.author.id);
            await message.guild.members.fetch(message.author);
        }
        const guildPrefixes = [];
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
        if (command.typing)
            message.channel.startTyping().catch(() => {
            });
        const parsedArguments = yargsParser(commandTrigger.arguments, command.arguments);
        parsedArguments._raw = commandTrigger.arguments;
        await command.exec(message, parsedArguments);
        if (command.typing)
            message.channel.startTyping().catch(() => {
            });
        return true;
    }
    parseCommandTrigger(message, guildPrefixes = []) {
        const prefixes = guildPrefixes && guildPrefixes.length ? guildPrefixes : this.prefixes;
        const triggerRegExp = new RegExp("^(" + prefixes.join("|").replace(/[.*+?^${}()[\]\\]/g, "\\$&") + ")[a-z0-9]+(?:$| )");
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