import * as chalk from "chalk";

import TesseractClient from "./TesseractClient";


/**
 * Logger class to help with Tesseract Client with logging.
 */
export default class TesseractClientLogger {
    /** The client this logger belongs to. */
    public client: TesseractClient;

    constructor(client: TesseractClient) {
        this.client = client;
    }

    /** Used to display errors. */
    public error = (...message: unknown[]): void => {
        console.info(chalk`{red [ERROR} {gray ${new Date()}}{red ]}`);
        console.error(...message);
        console.trace();
        console.info(chalk`{red [ERROR]}`);
    };

    /** Used to display info messages. */
    public info = (...message: unknown[]): void => {
        console.info(chalk`{gray ${new Date()}}`, ...message);
    };

    /** Used to display messages from the client. */
    public message = (...message: unknown[]): void => {
        const username = this.client.user ? this.client.user.username : "BOT";

        console.info(chalk.gray(new Date()));
        console.info(chalk`{cyan [${username}]:}`, ...message);
    };

    /** Used to display warnings. */
    public warn = (...message: unknown[]): void => {
        console.info(chalk`{yellow [WARNING} {gray ${new Date()}}{yellow ]}`);
        console.warn(...message);
        console.trace();
        console.info(chalk`{yellow [WARNING]}`);
    };
}
