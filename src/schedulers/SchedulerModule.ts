import TesseractModule from "../TesseractModule";


interface SchedulerModuleOptions {
    /** The cron time expression that represents when to schedule this. */
    cronTime: string;
}

/**
 * Abstract class for creating Tesseract schedulers.
 */
abstract class SchedulerModule extends TesseractModule {
    /** The cron time expression that represents when to schedule this. */
    public cronTime: string;

    constructor(name: string, options: SchedulerModuleOptions) {
        super(name);

        this.cronTime = options.cronTime;
    }

    public abstract exec(...args: unknown[]): Promise<unknown>;
}


export default SchedulerModule;
