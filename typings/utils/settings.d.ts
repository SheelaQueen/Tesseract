import { IDataStoreOptions } from "../datastore/DataStoreManager";
export interface ITesseractConfigurations {
    prefixes: string[];
}
export interface ITesseractCredentials {
    owners: string[];
    token: string;
    datastore?: {
        dialect: IDataStoreOptions["dialect"];
        uri: string;
    };
}
export declare const getConfigurations: () => ITesseractConfigurations;
export declare const getCredentials: () => ITesseractCredentials;
//# sourceMappingURL=settings.d.ts.map