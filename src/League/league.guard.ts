import { LeagueRepository } from "./league.repository";
import { LeagueDTO } from "./league.service";

export class LeagueGuard {
    constructor(private readonly leagueRepository: LeagueRepository) {}

    public isValidAddLeagueDTO(dto: LeagueDTO): boolean {
        return !!dto.name.length;
    }

    public async checkIfLeagueExists(dto: LeagueDTO): Promise<boolean> {
        const league = await this.leagueRepository.retrieveOne(dto.name);
        return !!league;
    }
}