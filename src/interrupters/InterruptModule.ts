import TesseractModule from "../TesseractModule";
import TesseractError from "../errors/TesseractError";

interface IInterruptModuleOptions {
}

/**
 * Abstract class for creating Tesseract interrupts.
 */
abstract class InterruptModule extends TesseractModule {
  constructor(name: string, options: IInterruptModuleOptions = {}) {
    super(name);

    this.name = name;
  }

  public exec(...args: any): Promise<boolean> {
    throw new TesseractError(`Non-abstract class '${this.constructor.name}' does not implement inherited abstract method 'exec' from class 'InterruptModule'`);
  }
}

export default InterruptModule;
