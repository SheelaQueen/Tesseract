declare abstract class TesseractModuleManagerEvent {
    name: string;
    constructor(name: string);
    abstract exec(...args: unknown[]): Promise<unknown>;
}
export default TesseractModuleManagerEvent;
//# sourceMappingURL=TesseractModuleManagerEvent.d.ts.map