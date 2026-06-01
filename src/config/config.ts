import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT ||6000,

    database: {
        dbhost: process.env.HOST,
        dbport: process.env.DB_PORT,
        dbuser: process.env.USER,
        dbpassword: process.env.PASSWORD,
        database: process.env.DATABASE,
        dbdialect: process.env.DIALECT
    }
};