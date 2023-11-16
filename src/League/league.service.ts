import { InvalidUserLeagueDataError } from "./errors/InvalidUserLeagueData.error";
import { LeagueAlreadyExistsError } from "./errors/LeagueAlreadyExists.error";
import { LeagueEntity } from "./league.entity";
import { LeagueGuard } from "./league.guard";
import { LeagueRepository } from "./league.repository";

export interface LeagueDTO {
    name: string,
}

export class LeagueService {
    constructor(private readonly leagueRepository: LeagueRepository, private readonly leagueGuard: LeagueGuard) {}

    public async add(dto: LeagueDTO) {
        const isValid = this.leagueGuard.isValidAddLeagueDTO(dto);
        if (!isValid) throw new InvalidUserLeagueDataError();

        const leagueExists = await this.leagueGuard.checkIfLeagueExists(dto);
        if (leagueExists) throw new LeagueAlreadyExistsError();

        const league = new LeagueEntity().setName(dto.name);
        return this.leagueRepository.create(league);
    }

    public async getAllLeagues() {
        return this.leagueRepository.retrieveAll();
    }
}