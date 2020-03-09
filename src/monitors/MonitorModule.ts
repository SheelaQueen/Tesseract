import TesseractModule from "../TesseractModule";


interface MonitorModuleOptions {
    /** The event emitter for this monitor. */
    event: string;
    /** Frequency of the interval for running this monitor. */
    frequency: number;
}

/**
 * Abstract class for creating Tesseract monitors.
 */
abstract class MonitorModule extends TesseractModule {
    /** The event emitter for this monitor. */
    public event: string;
    public frequency: number;

    constructor(name: string, options: MonitorModuleOptions) {
        super(name);

        this.name = name;
        this.event = options.event;
        this.frequency = options.frequency;
    }

    public abstract exec(...args: unknown[]): Promise<unknown>;
}


export default MonitorModule;
