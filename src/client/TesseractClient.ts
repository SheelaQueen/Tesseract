/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 */

import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";
import { Client, ClientOptions } from "discord.js";

import TesseractClientUtils from "./TesseractClientUtils";
import ListenerModuleManager from "../listeners/ListenerModuleManager";

interface ITesseractConfigurations {
  prefixes: string[];
}

interface ITesseractCredentials {
  owners: string[];
  token: string;
}

/**
 * The TesseractClient is the starting point for Discord bots.
 */
class TesseractClient extends Client {
  configurations: ITesseractConfigurations;
  credentials: ITesseractCredentials;
  utils: TesseractClientUtils;

  constructor(options: ClientOptions = {}) {
    super(options);

    this.options = options;

    // Load settings
    this.loadSettings();

    // Utility methods
    this.utils = new TesseractClientUtils(this);

    // Tesseract Managers
    new ListenerModuleManager(this);
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
   * Logs the client in, establishing a websocket connection to Discord.
   */
  public login(token?: string): Promise<string> {
    if (token) this.credentials.token = token;
    return super.login(this.credentials.token);
  }

  public toString(): string {
    return "Tesseract";
  }
}

export default TesseractClient;
