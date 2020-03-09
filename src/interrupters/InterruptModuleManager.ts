import TesseractClient from "../client/TesseractClient";
import TesseractModuleManager from "../TesseractModuleManager";


/**
 * Interrupt Module Manager loads interrupts.
 */
class InterruptModuleManager extends TesseractModuleManager {
    constructor(client: TesseractClient) {
        super(client, { directory: "./interrupts/" });

        super.load();
    }
}


export default InterruptModuleManager;
