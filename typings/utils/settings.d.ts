export interface TesseractConfigurations {
    prefixes: string[];
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