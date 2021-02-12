export interface DbQuery {
    sql: string,
    params: Array<String | Number>,
    callback: Function
}