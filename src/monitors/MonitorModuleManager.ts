import { Collection } from "discord.js";

import TesseractClient from "../client/TesseractClient";
import TesseractModuleManager from "../TesseractModuleManager";
import MonitorModule from "./MonitorModule";


/**
 * Monitor Module Manager loads monitors and attaches them to their
 * respective EventEmitters.
 */
class MonitorModuleManager extends TesseractModuleManager {
    constructor(client: TesseractClient) {
        super(client, { directory: "./monitors/" });

        this.load();
    }

    public load(): void {
        super.load();

        // Segregate monitors for separate events.
        const monitors: { [key: string]: MonitorModule[] } = {};

        const modules = this.modules as Collection<string, MonitorModule>;
        modules.forEach(monitor => {
            if (Object.prototype.hasOwnProperty.call(monitors, monitor.event)) {
                monitors[monitor.event].push(monitor);
            } else {
                monitors[monitor.event] = [ monitor ];
            }
        });


        // Attach monitors to their respective event listeners.
        for (const event of Object.keys(monitors)) {
            this.client.once(event, (...args: unknown[]) => {
                for (const monitor of monitors[event]) {
                    this.client.setInterval(monitor.exec, monitor.frequency * 1000, ...args);
                }
            });
        }
    }
}


export default MonitorModuleManager;
