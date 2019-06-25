/// <reference types="node" />
import { EventEmitter } from "events";
import TesseractModule from "../TesseractModule";
import { LISTENER_MODE } from "../utils/Constants";
interface IListenerModuleOptions {
    emitter?: EventEmitter | string;
    mode?: LISTENER_MODE;
}
declare abstract class ListenerModule extends TesseractModule {
    emitter: EventEmitter | string;
    mode: LISTENER_MODE;
    constructor(name: string, options?: IListenerModuleOptions);
    exec(...args: any): Promise<any>;
}
export default ListenerModule;
//# sourceMappingURL=ListenerModule.d.ts.map