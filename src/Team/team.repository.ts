import { AppDAO } from "../types";
import { TeamEntity } from "./team.entity";
import { TeamSqlCommands } from "./types";

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
        return this.dao.run(TeamSqlCommands.INSERT, [team.getName()]);
    }

    public async retrieveAll(): Promise<TeamEntity[]> {
        return this.dao.all(TeamSqlCommands.SELECT_ALL, []);
    }

    public async retrieveOne(name: TeamEntity['name']) {
        return this.dao.get(TeamSqlCommands.SELECT_BY_NAME, [name]);
    }

    public async delete(name: TeamEntity['name']) {
        return this.dao.run(TeamSqlCommands.DELETE_BY_NAME, [name]);
    }

    public async updateByName(team: TeamEntity, update: TeamEntity) {
        return this.dao.run(TeamSqlCommands.UPDATE_BY_NAME, [update.getName(), team.getName()]);
    }
}