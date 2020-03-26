import * as fs from "fs";
import * as path from "path";
import {
    Structures,
    GuildEmoji,
    DMChannel,
    TextChannel,
    VoiceChannel,
    CategoryChannel,
    NewsChannel,
    StoreChannel,
    GuildMember,
    Guild,
    Message,
    MessageReaction,
    Presence,
    VoiceState,
    Role,
    User,
} from "discord.js";

import walkDirectory from "./utils/walkDirectory";


type ExtendableStructureNames = "GuildEmoji" | "DMChannel" | "TextChannel" | "VoiceChannel" | "CategoryChannel" | "NewsChannel" | "StoreChannel" | "GuildMember" | "Guild" | "Message" | "MessageReaction" | "Presence" | "VoiceState" | "Role" | "User";
type ExtendableStructures = typeof GuildEmoji | typeof DMChannel | typeof TextChannel | typeof VoiceChannel | typeof CategoryChannel | typeof NewsChannel | typeof StoreChannel | typeof GuildMember | typeof Guild | typeof Message | typeof MessageReaction | typeof Presence | typeof VoiceState | typeof Role | typeof User;

/** Tesseract Structure Manager initializes extended discord.js structures. */
class TesseractStructureManager {
    /** Returns the path of all the modules in the specified directory. */
    private static resolveModules(moduleDirectory: string): string[] {
        const files: string[] = walkDirectory(moduleDirectory);
        return files.filter(file => __filename.endsWith(".ts") ? file.endsWith(".ts") : file.endsWith(".js"));
    }

    /** Initialize all the extended structures. */
    public static initialize(): void {
        const structuresDirectory: string = path.resolve("./structures/");

        if (fs.existsSync(structuresDirectory)) {
            const files: string[] = TesseractStructureManager.resolveModules(structuresDirectory);

            for (const file of files) {
                Structures.extend(
                    path.basename(file).slice(0, -3) as ExtendableStructureNames,
                    () => require(file) as ExtendableStructures,
                );
            }
        }
    }
}


export {
    ExtendableStructureNames,
    ExtendableStructures,
};

export default TesseractStructureManager;
