import { LeagueNotFoundError } from "../League/errors/LeagueNotFound.error";
import { LeagueEntity } from "../League/league.entity";
import { LeagueGuard } from "../League/league.guard";
import { LeagueRepository } from "../League/league.repository";
import { TeamNotFoundError } from "../Team/errors/TeamNotFound.error";
import { TeamGuard } from "../Team/team.guard";
import { TeamRepository } from "../Team/team.repository";
import { InvalidUserStatisticsDataError } from "./errors/InvalidUserStatisticsData.error";
import { StatisticsEntity } from "./statistics.entity";
import { StatisticsGuard } from "./statistics.guard";
import { StatiscticsRepository } from "./statistics.repository"

export interface StatisticsDTO {
    points: string,
    teamName: string,
    leagueName: string,
}

export class StatisticsService {
    constructor(
        private readonly statisticsRepository: StatiscticsRepository, 
        private readonly statisticsGuard: StatisticsGuard, 
        private readonly teamRepository: TeamRepository,
        private readonly teamGuard: TeamGuard,
        private readonly leagueRepository: LeagueRepository,
        private readonly leagueGuard: LeagueGuard
    ) {}

    public async add(dto: StatisticsDTO) {
        const isValid = this.statisticsGuard.isValidAddLeagueDTO(dto);
        if (!isValid) throw new InvalidUserStatisticsDataError();

        const teamExists = await this.teamGuard.checkIfTeamExists({ name: dto.teamName });
        if (!teamExists) throw new TeamNotFoundError();
        const leagueExists = await this.leagueGuard.checkIfLeagueExists({ name: dto.leagueName });
        if (!leagueExists) throw new LeagueNotFoundError();

        const team = await this.teamRepository.retrieveOne(dto.teamName);
        const league = await this.leagueRepository.retrieveOne(dto.leagueName);

        const statitistics = new StatisticsEntity().setPoints(+dto.points).setTeamId(team.id).setLeagueId(league.id);
        return this.statisticsRepository.create(statitistics);
    }

    public async getScoresheet(leagueName: LeagueEntity['name']) {
        if (!leagueName) throw new Error('You must input a league name.');

        const leagueExists = await this.leagueGuard.checkIfLeagueExists({ name: leagueName });
        if (!leagueExists) throw new LeagueNotFoundError();

        const scoresheet: {league_name: string, team_name: string, rounds: number, points: number,  }[] = await this.statisticsRepository.retirieveAllByLeague(leagueName);
        return scoresheet.sort((teamA, teamB) => teamB.points - teamA.points);
    }
}