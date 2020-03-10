import TesseractModule from "../TesseractModule";
interface SchedulerModuleOptions {
    cronTime: string;
}
declare abstract class SchedulerModule extends TesseractModule {
    cronTime: string;
    constructor(name: string, options: SchedulerModuleOptions);
    abstract exec(...args: unknown[]): Promise<unknown>;
}
export default SchedulerModule;
//# sourceMappingURL=SchedulerModule.d.ts.map