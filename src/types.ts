export interface AppDAO {
    run: (sql: string, params: string[]) => any;
    all: <T>(sql: string, params: string[]) => Promise<T[]>;
    get: (sql: string, params: string[]) => any;
}