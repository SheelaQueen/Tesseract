import { DataStoreOptions } from "../datastore/DataStoreManager";
export interface TesseractConfigurations {
    prefixes: string[];
}
export interface TesseractCredentials {
    owners: string[];
    token: string;
    datastore?: {
        dialect: DataStoreOptions["dialect"];
        uri: string;
    };
}
export declare const getConfigurations: () => TesseractConfigurations;
export declare const getCredentials: () => TesseractCredentials;
//# sourceMappingURL=settings.d.ts.map