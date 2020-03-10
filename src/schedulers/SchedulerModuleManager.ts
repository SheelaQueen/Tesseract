import * as cron from "cron";

import TesseractClient from "../client/TesseractClient";
import TesseractModuleManager from "../TesseractModuleManager";
import SchedulerModule from "./SchedulerModule";


/**
 * Scheduler Module Manager loads schedulers and starts the cron job
 * based on the cron expression.
 */
class SchedulerModuleManager extends TesseractModuleManager {
    constructor(client: TesseractClient) {
        super(client, { directory: "./schedulers/" });

        super.load();
    }

    /** Initializes the cron job for the specified scheduler. */
    protected initializeCronJob(scheduler: SchedulerModule): void {
        new cron.CronJob({
            cronTime: scheduler.cronTime,
            onTick: scheduler.exec,
            start: true,
            unrefTimeout: true,
        });
    }

    /** Initializes the scheduler. */
    protected initializeModule(scheduler: SchedulerModule): SchedulerModule {
        super.initializeModule(scheduler);

        this.initializeCronJob(scheduler);

        return scheduler;
    }
}


export default SchedulerModuleManager;
