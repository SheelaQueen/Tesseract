/**
 * Base class for errors in Tesseract.
 */
class TesseractError extends Error {
    constructor(message?: string) {
        super(message);
    }

    public get name(): string {
        return this.constructor.name;
    }
}

export default TesseractError;
