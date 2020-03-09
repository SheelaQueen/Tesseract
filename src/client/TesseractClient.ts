/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 */

import { Client, ClientOptions } from "discord.js";

import TesseractClientUtils from "./TesseractClientUtils";
import DataStoreManager from "../datastore/DataStoreManager";
import InterruptModuleManager from "../interrupters/InterruptModuleManager";
import ListenerModuleManager from "../listeners/ListenerModuleManager";
import MonitorModuleManager from "../monitors/MonitorModuleManager";
import CommandModuleManager from "../commands/CommandModuleManager";
import * as settings from "../utils/settings";


/**
 * The TesseractClient is the starting point for Discord bots.
 */
class TesseractClient extends Client {
    configurations: settings.TesseractConfigurations;
    credentials: settings.TesseractCredentials;
    utils: TesseractClientUtils;
    interrupter: InterruptModuleManager;
    dataStore: DataStoreManager;

    constructor(options: ClientOptions = {}) {
        super(options);

        // Load settings
        this.loadSettings();

        // Utility methods
        this.utils = new TesseractClientUtils(this);

        // DataStore
        this.dataStore = this.credentials.datastore
            ? new DataStoreManager({
                dialect: this.credentials.datastore.dialect,
                providerOptions: {
                    uri: this.credentials.datastore.uri,
                    logging: false,
                },
            })
            : null;

        // Tesseract Managers
        this.interrupter = new InterruptModuleManager(this);
        new ListenerModuleManager(this);
        new MonitorModuleManager(this);
        new CommandModuleManager(this);
    }

    /**
     * Loads the configurations and credentials files from the settings directory.
     */
    public loadSettings(): void {
        this.configurations = settings.getConfigurations();
        this.credentials = settings.getCredentials();
    }

    /**
     * Establish connection to the DataStore.
     */
    public async connectDataStore(): Promise<void> {
        if (!this.dataStore) return;
        await this.dataStore.store.connect();
    }

    /**
     * Logs the client in, establishing a websocket connection to Discord.
     */
    public async login(token?: string): Promise<string> {
        // Connect to DataStore before logging in
        await this.connectDataStore();

        if (token) this.credentials.token = token;
        return super.login(this.credentials.token);
    }

    public toString(): string {
        return "Tesseract";
    }
}


export default TesseractClient;
