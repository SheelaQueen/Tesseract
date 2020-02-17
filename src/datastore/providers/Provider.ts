import * as sequelize from "sequelize";

/**
 * Base class for Tesseract DataStore Providers
 */
export default abstract class Provider {
    /** Database */
    public abstract db: sequelize.Sequelize;

    /** Connect to the DataStore. */
    public abstract connect(): Promise<any>;

    /** Disconnect from the DataStore. */
    public abstract disconnect(): Promise<any>;
};
