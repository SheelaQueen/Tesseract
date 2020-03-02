import TesseractClient from "./TesseractClient";
export default class TesseractClientUtils {
    client: TesseractClient;
    constructor(client: TesseractClient);
    compressString(string: string): Promise<string>;
    decompressString(string: string): Promise<string>;
}
//# sourceMappingURL=TesseractClientUtils.d.ts.map