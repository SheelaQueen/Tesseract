import TesseractModule from "../TesseractModule";
import TesseractError from "../errors/TesseractError";

interface IMonitorModuleOptions {
  /** The event emitter for this monitor. */
  event?: string;
  /** Frequency of the interval for running this monitor. */
  frequency?: number;
}

/**
 * Abstract class for creating Tesseract monitors.
 */
abstract class MonitorModule extends TesseractModule {
  /** The event emitter for this monitor. */
  public event: string;
  public frequency: number;

  constructor(name: string, options: IMonitorModuleOptions = {}) {
    super(name);

    this.name = name;
    this.event = options.event;
    this.frequency = options.frequency;
  }

  public exec(...args: any): Promise<any> {
    throw new TesseractError(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract method 'exec' from class 'MonitorModule'`);
  }
}

export default MonitorModule;
