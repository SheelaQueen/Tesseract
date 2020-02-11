import TesseractModule from "../TesseractModule";
interface IInterruptModuleOptions {
}
declare abstract class InterruptModule extends TesseractModule {
    constructor(name: string, options?: IInterruptModuleOptions);
    exec(...args: any): Promise<boolean>;
}
export default InterruptModule;
//# sourceMappingURL=InterruptModule.d.ts.map