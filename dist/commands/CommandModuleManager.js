"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargsParser = require("yargs-parser");
const TesseractModuleManager_1 = require("../TesseractModuleManager");
class CommandManager extends TesseractModuleManager_1.default {
    constructor(client) {
        super(client, { directory: "./commands/" });
        this.prefixes = client.configurations.prefixes;
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
        const command = this.modules.get(commandTrigger.command);
        if (!command) {
            return false;
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
        const parsedArguments = yargsParser(commandTrigger.arguments, command.arguments);
        parsedArguments._raw = commandTrigger.arguments;
        await command.exec(message, parsedArguments);
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