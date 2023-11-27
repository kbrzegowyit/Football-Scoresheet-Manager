import { LeagueNotFoundError } from "../League/errors/LeagueNotFound.error";
import { LeagueEntity } from "../League/league.entity";
import { LeagueGuard } from "../League/league.guard";
import { LeagueRepository } from "../League/league.repository";
import { TeamNotFoundError } from "../Team/errors/TeamNotFound.error";
import { TeamGuard } from "../Team/team.guard";
import { TeamRepository } from "../Team/team.repository";
import { SortOrder, Sorter } from "../sort/types";
import { InvalidUserStatisticsDataError } from "./errors/InvalidUserStatisticsData.error";
import { ScoresheetNotFoundError } from "./errors/ScoresheetNotFound.error";
import { StatisticsEntity } from "./statistics.entity";
import { StatisticsGuard } from "./statistics.guard";
import { StatiscticsRepository } from "./statistics.repository"
import { RetirieveAllByLeagueRow } from "./types";

export interface StatisticsDTO {
    points: string,
    teamName: string,
    leagueName: string,
}

export interface AssignTeamToLeagueDTO {
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
        private readonly leagueGuard: LeagueGuard,
        private readonly sorter: Sorter,
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
        if (!leagueName) throw new InvalidUserStatisticsDataError;

        const leagueExists = await this.leagueGuard.checkIfLeagueExists({ name: leagueName });
        if (!leagueExists) throw new LeagueNotFoundError();

        const scoresheet = await this.statisticsRepository.retirieveAllByLeague(leagueName);
        if (!scoresheet.length) throw new ScoresheetNotFoundError()
        // It allows to compare the objects by returning points during conversion.
        const extended = scoresheet.map((obj) => {
            obj['valueOf'] = () => obj.points;
            return obj;
        })
        this.sorter.sort<RetirieveAllByLeagueRow>(extended, SortOrder.Ascending);
        return extended;
    }

    public async assignTeamToLeague(dto: AssignTeamToLeagueDTO) {
        const isValid = this.statisticsGuard.isValidAssignTeamToLeagueDTO(dto);
        if (!isValid) throw new InvalidUserStatisticsDataError();

        const teamExists = await this.teamGuard.checkIfTeamExists({ name: dto.teamName });
        if (!teamExists) throw new TeamNotFoundError();
        const leagueExists = await this.leagueGuard.checkIfLeagueExists({ name: dto.leagueName });
        if (!leagueExists) throw new LeagueNotFoundError();

        const team = await this.teamRepository.retrieveOne(dto.teamName);
        const league = await this.leagueRepository.retrieveOne(dto.leagueName);

        const statitistics = new StatisticsEntity().setTeamId(team.id).setLeagueId(league.id);
        return this.statisticsRepository.create(statitistics);
    }
}