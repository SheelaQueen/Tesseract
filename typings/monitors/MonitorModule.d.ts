import TesseractModule from "../TesseractModule";
interface IMonitorModuleOptions {
    event: string;
    frequency: number;
}
declare abstract class MonitorModule extends TesseractModule {
    event: string;
    frequency: number;
    constructor(name: string, options: IMonitorModuleOptions);
    abstract exec(...args: any): Promise<any>;
}
export default MonitorModule;
//# sourceMappingURL=MonitorModule.d.ts.map