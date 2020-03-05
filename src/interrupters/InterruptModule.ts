import TesseractModule from "../TesseractModule";


/**
 * Abstract class for creating Tesseract interrupts.
 */
abstract class InterruptModule extends TesseractModule {
  constructor(name: string) {
    super(name);

    this.name = name;
  }

  public abstract exec(...args: any): Promise<boolean>;
}


export default InterruptModule;
