import * as mongoose from "mongoose";
import * as sequelize from "sequelize";

/**
 * Base class for Tesseract DataStore Providers
 */
export default abstract class Provider {
    /** Database */
    public abstract db: mongoose.Mongoose | sequelize.Sequelize;

    /** Connect to the DataStore. */
    public abstract connect(): Promise<unknown>;

    /** Disconnect from the DataStore. */
    public abstract disconnect(): Promise<unknown>;
}
