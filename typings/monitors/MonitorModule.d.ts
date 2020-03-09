import TesseractModule from "../TesseractModule";
interface MonitorModuleOptions {
    event: string;
    frequency: number;
}
declare abstract class MonitorModule extends TesseractModule {
    event: string;
    frequency: number;
    constructor(name: string, options: MonitorModuleOptions);
    abstract exec(...args: unknown[]): Promise<unknown>;
}
export default MonitorModule;
//# sourceMappingURL=MonitorModule.d.ts.map