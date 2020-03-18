import TesseractClient from "./TesseractClient";
export default class TesseractClientLogger {
    client: TesseractClient;
    constructor(client: TesseractClient);
    error: (...message: unknown[]) => void;
    info: (...message: unknown[]) => void;
    message: (...message: unknown[]) => void;
    warn: (...message: unknown[]) => void;
}
//# sourceMappingURL=TesseractClientLogger.d.ts.map