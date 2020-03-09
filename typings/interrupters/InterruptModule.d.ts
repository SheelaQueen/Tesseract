import TesseractModule from "../TesseractModule";
declare abstract class InterruptModule extends TesseractModule {
    constructor(name: string);
    abstract exec(...args: unknown[]): Promise<boolean>;
}
export default InterruptModule;
//# sourceMappingURL=InterruptModule.d.ts.map