
import { SqlClient } from "msnodesqlv8";

const sql: SqlClient = require("msnodesqlv8");

class Database {

    async connect() {

        const connectionString = "server=.;Database=bar;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
        const query = "SELECT * FROM tipoBebida";

        sql.query(connectionString, query, (err, rows) => {
            console.log(rows);
        });
    }

}

export const database = new Database()