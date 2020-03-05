import { EventEmitter } from "events";

import TesseractModule from "../TesseractModule";
import { LISTENER_MODE } from "../utils/Constants";


interface IListenerModuleOptions {
  /** The event emitter for this listener. */
  emitter?: EventEmitter | string;
  /** The execution mode of the event listener. */
  mode?: LISTENER_MODE;
}

/**
 * Abstract class for creating Tesseract event listeners.
 */
abstract class ListenerModule extends TesseractModule {
  /** The event emitter for this listener. */
  public emitter: EventEmitter | string;
  /** The execution mode of the event listener. */
  public mode: LISTENER_MODE;

  constructor(name: string, options: IListenerModuleOptions = {}) {
    super(name);

    this.emitter = options.emitter || "tesseract";
    this.mode = options.mode || LISTENER_MODE.ON;
  }

  public abstract exec(...args: any): Promise<any>;
}


export default ListenerModule;
