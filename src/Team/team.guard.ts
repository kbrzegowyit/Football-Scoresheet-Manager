import { TeamRepository } from "./team.repository";
import { TeamDTO } from "./team.service";

export class TeamGuard {
    constructor(private readonly teamRepository: TeamRepository) {}

    public isValidAddTeamDTO(dto: TeamDTO): boolean {
        return !!dto.name.length;
    }

    public async checkIfTeamExists(dto: TeamDTO): Promise<boolean> {
        const team = await this.teamRepository.retrieveOne(dto.name);
        return !!team;
    }
}