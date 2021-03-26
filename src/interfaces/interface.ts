export interface dbOptions {
    dbConnInfo: {
        host: String,
        port: string,
        user: string,
        password: string,
        database: string,
        dateStrings?: string[],
        multipleStatements?: boolean, //멀티 쿼리 활성화
    }
}

export interface httpsOptions {
    key: string,
    cert: string
}