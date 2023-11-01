export interface AppDAO {
    run: (sql: string, params: string[]) => any;
    all: (sql: string, params: string[]) => any;
    get: (sql: string, params: string[]) => any;
}