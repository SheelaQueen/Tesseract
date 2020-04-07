import { PresenceData } from "discord.js";
export interface TesseractConfigurations {
    prefixes: string[];
    presence?: PresenceData;
}
export interface TesseractCredentials {
    owners: string[];
    token: string;
    datastore?: {
        uri: string;
    };
}
export declare const getConfigurations: () => TesseractConfigurations;
export declare const getCredentials: () => TesseractCredentials;
//# sourceMappingURL=settings.d.ts.map