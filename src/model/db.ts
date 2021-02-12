import mysql from 'mysql';
import dotenv from 'dotenv';
import { DbQuery } from '../interfaces/db';
dotenv.config();

class GetConnect {
    dbInfo: Object = {}
    constructor() { }

    dbConnection(): mysql.Connection {
        this.dbInfo = {
            host: process.env.DEV_DB_HOST,
            port: process.env.DEV_DB_PORT,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASSWORD,
            database: process.env.DEV_DB_NAME,
            dateStrings: [
                'DATE',
                'DATETIME'
            ],
            multipleStatements: true
        }

        const conn = mysql.createConnection(this.dbInfo);
        conn.connect();
        return conn;
    }
}

class CloseConnect {
    constructor(public conn: mysql.Connection) { }

    dbCloseConnection(): void {
        this.conn.end();
    }
}

export class Query implements DbQuery {
    constructor(
        public sql: string,
        public params: Array<String | Number>,
        public callback: Function
    ) {
        this.dbQuery();
    }

    private dbQuery(): void {
        const connSettings = new GetConnect();
        const conn = connSettings.dbConnection();
        const _this = this;

        conn.query(this.sql, this.params, function (err, results) {
            if (err) {
                return console.error(err);
            }
            _this.callback(results);
        });

        this.dbClose(conn);
    }

    private dbClose(conn: mysql.Connection): void {
        const connClose = new CloseConnect(conn);
        connClose.dbCloseConnection();
    }
}