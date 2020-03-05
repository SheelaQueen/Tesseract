import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";

import { IDataStoreOptions } from "../datastore/DataStoreManager";


/**
 * Parses the provided YAML file in the settings directory and caches them in
 * the client.
 */
const loadFile = (file: string, directory = path.resolve("./settings/")): any => {
    let filePath = path.join(directory, file + ".yaml");
    let settings = fs.readFileSync(filePath, "utf8");

    return YAML.parse(settings);
};


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


/**
 * Loads the configurations file from the settings directory and returns it.
 */
export const getConfigurations = (): ITesseractConfigurations => {
    return loadFile("configurations");
};

/**
 * Loads the credentials files from the settings directory and returns it.
 */
export const getCredentials = (): ITesseractCredentials => {
    return loadFile("credentials");
};
