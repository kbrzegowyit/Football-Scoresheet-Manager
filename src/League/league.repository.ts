import { AppDAO } from "../types";
import { LeagueEntity } from "./league.entity";

export class LeagueRepository {
    constructor(private readonly dao: AppDAO) {}

    public async createTable(): Promise<void> {
        const sql = `CREATE TABLE IF NOT EXISTS leagues (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT type UNIQUE
        )`;
        return this.dao.run(sql, []);
    };

    public async create(league: LeagueEntity) {
        const sql = `INSERT INTO leagues (name) VALUES (?)`;
        return this.dao.run(sql, [league.getName()]);
    }
}