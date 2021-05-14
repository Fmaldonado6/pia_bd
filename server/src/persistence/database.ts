
import { QueryDescription, SqlClient } from "msnodesqlv8";
import { databaseConfiguration } from "./configuration/databaseConfiguration";


class Database {
    sql: SqlClient = require("msnodesqlv8");
    connectionString = "server=.;Database=barDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"
    async connect() {

        await databaseConfiguration.config()

    }
    executeQuery(query: string): Promise<any[] | undefined> {
        return new Promise((resolve, reject) => {
            database.sql.query(database.connectionString, query, (err, rows) => {

                if (err)
                    reject(err)

                resolve(rows)
            })
        })


    }


}

export const database = new Database()