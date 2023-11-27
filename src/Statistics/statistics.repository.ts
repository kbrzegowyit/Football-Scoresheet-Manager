import { LeagueEntity } from "../League/league.entity";
import { AppDAO } from "../types";
import { StatisticsEntity } from "./statistics.entity";
import { RetirieveAllByLeagueRow } from "./types";

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

    public async retirieveAllByLeague(leagueName: LeagueEntity['name']): Promise<RetirieveAllByLeagueRow[]> {
        const sql = `SELECT leagues.name as "leagueName", teams.name as "teamName", count(teams.name) as "rounds", sum(statistics.points) as "points" FROM statistics
        INNER JOIN teams ON statistics.team_id = teams.id
        INNER JOIN leagues ON statistics.league_id = leagues.id
        WHERE leagues.name = ?
        GROUP BY teams.name;`;
        return this.dao.all<RetirieveAllByLeagueRow>(sql, [leagueName]);
    }

    public async assignTeamToLeague(statistics: StatisticsEntity) {
        const sql = `INSERT INTO statistics (points, team_id, league_id) VALUES (?, ?, ?)`;
        return this.dao.run(sql, ['0', statistics.getTeamId(), statistics.getLeagueId()]);
    }
}