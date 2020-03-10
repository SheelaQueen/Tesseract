import TesseractClient from "../client/TesseractClient";
import TesseractModuleManager from "../TesseractModuleManager";
import SchedulerModule from "./SchedulerModule";
declare class SchedulerModuleManager extends TesseractModuleManager {
    constructor(client: TesseractClient);
    protected initializeCronJob(scheduler: SchedulerModule): void;
    protected initializeModule(scheduler: SchedulerModule): SchedulerModule;
}
export default SchedulerModuleManager;
//# sourceMappingURL=SchedulerModuleManager.d.ts.map