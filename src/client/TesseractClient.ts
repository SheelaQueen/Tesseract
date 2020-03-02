/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 */

import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";
import { Client, ClientOptions } from "discord.js";

import TesseractClientUtils from "./TesseractClientUtils";
import DataStoreManager, { IDataStoreOptions } from "../datastore/DataStoreManager";
import InterruptModuleManager from "../interrupters/InterruptModuleManager";
import ListenerModuleManager from "../listeners/ListenerModuleManager";
import MonitorModuleManager from "../monitors/MonitorModuleManager";
import CommandModuleManager from "../commands/CommandModuleManager";

interface ITesseractConfigurations {
  prefixes: string[];
}

interface ITesseractCredentials {
  owners: string[];
  token: string;
  datastore?: {
    dialect: IDataStoreOptions["dialect"];
    uri: string;
  };
}

/**
 * The TesseractClient is the starting point for Discord bots.
 */
class TesseractClient extends Client {
  configurations: ITesseractConfigurations;
  credentials: ITesseractCredentials;
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
   * Parses the provided YAML file in the settings directory and caches them in
   * the client.
   */
  private loadSettingsFile(file: string, directory = path.resolve("./settings/")): any {
    let filePath = path.join(directory, file + ".yaml");
    let settingsFile = fs.readFileSync(filePath, "utf8");
    return YAML.parse(settingsFile);
  }

  /**
   * Loads the configurations and credentials files from the settings directory.
   */
  public loadSettings(): void {
    this.configurations = this.loadSettingsFile("configurations");
    this.credentials = this.loadSettingsFile("credentials");
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
