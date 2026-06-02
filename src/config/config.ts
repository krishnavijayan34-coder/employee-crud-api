import dotenv from "dotenv";

dotenv.config();
interface DatabaseConfig {dbhost:string;dbport: number;dbuser: string;dbpassword: string;database: string;dbdialect: string;}
interface AppConfig {
    port:number;database:DatabaseConfig;
}
export const config: AppConfig = {
    port: Number (process.env.PORT) ||6000,

    database: {
         dbhost: process.env.HOST || "127.0.0.1",
        dbport: Number(process.env.DB_PORT) || 3306,
        dbuser: process.env.USER || "",
        dbpassword: process.env.PASSWORD || "",
        database: process.env.DATABASE || "",
        dbdialect: process.env.DIALECT || "mysql"
    }
};