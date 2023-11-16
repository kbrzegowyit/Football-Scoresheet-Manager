import { AppDAO } from "../types";
import { TeamEntity } from "./team.entity";

export class TeamRepository {
    constructor(private readonly dao: AppDAO) {}

    public async createTable(): Promise<void> {
        const sql = `CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT type UNIQUE
        )`;
        return this.dao.run(sql, []);
    };

    public async create(team: TeamEntity) {
        const sql = `INSERT INTO teams (name) VALUES (?)`;
        return this.dao.run(sql, [team.getName()]);
    }

    public async retrieveAll() {
        const sql = `SELECT * FROM teams`;
        return this.dao.all(sql, []);
    }

    public async retrieveOne(name: TeamEntity['name']) {
        const sql = `SELECT * FROM teams WHERE name = ?`;
        return this.dao.get(sql, [name]);
    }
}