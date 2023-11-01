import { AppDAO } from "../types";
import { StatisticsEntity } from "./statistics.entity";

export class StatiscticsRepository {
    constructor(private readonly dao: AppDAO) {}

    public async createTable(): Promise<void> {
        const sql = `CREATE TABLE IF NOT EXISTS statistics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            points SMALLINT DEFAULT 0,
            team_id INTEGER,
            league_id INTEGER,
            CONSTRAINT statistics_fk_league_id FOREIGN KEY (league_id)
                REFERENCES leagues(id),
            CONSTRAINT statistics_fk_team_id FOREIGN KEY (team_id)
                REFERENCES teams(id)
        )`;
        return this.dao.run(sql, []);
    };

    public async create(statistics: StatisticsEntity) {
        const sql = `INSERT INTO statistics (points, team_id, league_id) VALUES (?, ?, ?)`;
        return this.dao.run(sql, [statistics.getPoints(), statistics.getTeamId(), statistics.getLeagueId()]);
    }

    public async update(statistics: StatisticsEntity) {
       const sql = `UPDATE statistics SET points = ? WHERE id = ?`;
       return this.dao.run(sql, [statistics.getPoints(), statistics.getId()]);
    }
}