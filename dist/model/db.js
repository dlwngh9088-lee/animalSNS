"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DbAbstract {
}
class Conn {
    constructor() {
        this.dbConnInfo = {};
        this.dbConnInfo = {
            host: process.env.DEV_DB_HOST,
            port: process.env.DEV_DB_PORT,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASSWORD,
            database: process.env.DEV_DB_NAME,
            dateStrings: [
                'DATE',
                'DATETIME'
            ],
            multipleStatements: true,
        };
    }
}
// class Pool extends Conn {
//     constructor() {
//         super();
//     }
//     dbConnection(): mysql.Pool {
//         const poolInfo = {
//             ...this.dbConnInfo,
//             connectionLimit: 3
//         }
//         const pool = mysql.createPool(poolInfo);
//         return pool;
//     }
// }
//db 연결
class GetConnect extends Conn {
    constructor() {
        super();
    }
    dbConnection() {
        const conn = mysql_1.default.createConnection(this.dbConnInfo);
        conn.connect();
        return conn;
    }
}
//db 연결 끊기
class CloseConnect {
    constructor(conn) {
        this.conn = conn;
    }
    dbCloseConnection() {
        this.conn.end();
    }
}
//sql 트랜잭션
class Query extends DbAbstract {
    constructor(sql, params, callback) {
        super(); //서브 클래스에서 상위 클래스를 호출할 때 사용하는 키워드, 부모가 갖고있는 기능과 자식인 자기도 갖고있는 부분을 super로 처리 
        this.sql = sql;
        this.params = params;
        this.callback = callback;
    }
    dbQuery() {
        const connSettings = new GetConnect();
        const conn = connSettings.dbConnection();
        const _this = this;
        let result = {};
        conn.beginTransaction(function (err) {
            if (err) {
                conn.rollback();
                result = {
                    status: 444,
                    message: "beginTransaction Error",
                    error: err,
                    data: {}
                };
                _this.callback(result);
            }
            else {
                conn.query(_this.sql, _this.params, function (err, results) {
                    if (err) {
                        conn.rollback();
                        result = {
                            status: 444,
                            message: "query Error",
                            error: err,
                            data: {}
                        };
                    }
                    else {
                        conn.commit(function () {
                            conn.end();
                            result = {
                                status: 222,
                                message: "success",
                                error: {},
                                data: results
                            };
                            _this.callback(result);
                        });
                    }
                });
            }
        });
        this.dbClose(conn);
    }
    dbClose(conn) {
        const connClose = new CloseConnect(conn);
        connClose.dbCloseConnection();
    }
}
exports.Query = Query;
//pool 트랜잭션
// export class PoolQuery extends DbAbstract {
//     constructor(
//         protected sql: string,
//         protected params: Array<String | Number>,
//         protected callback: Function
//     ) {
//         super();
//     }
//     dbQuery() {
//         const poolSettings = new Pool();
//         const pool = poolSettings.dbConnection();
//         const _this = this;
//         let result: Object = {};
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 result = {
//                     status: 444,
//                     message: "pool getConnection Error",
//                     error: err,
//                     data: {}
//                 }
//                 return _this.callback(result);
//             }
//             connection.beginTransaction(function (err) {
//                 if (err) {
//                     connection.rollback(function () {
//                         connection.release(); //반환
//                         result = {
//                             status: 444,
//                             message: "Pool beginTransaction Error",
//                             error: err,
//                             data: {}
//                         }
//                         return _this.callback(result);
//                     });
//                 } else {
//                     pool.query(_this.sql, _this.params, function (err, results) {
//                         if (err) {
//                             connection.rollback(function () {
//                                 connection.release();
//                             });
//                             result = {
//                                 status: 444,
//                                 message: "Pool query Error",
//                                 error: err,
//                                 data: {}
//                             }
//                             return _this.callback(result);
//                         } else {
//                             connection.commit(function () {
//                                 connection.end();
//                                 connection.release();
//                                 result = {
//                                     status: 222,
//                                     message: "Success",
//                                     error: {},
//                                     data: results
//                                 }
//                                return  _this.callback(result);
//                             });
//                         }
//                     });
//                 }
//             });
//         })
//     }
// }
