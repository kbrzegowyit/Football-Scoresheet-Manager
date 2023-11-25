import { InvalidUserTeamDataError } from "./errors/InvalidUserTeamData.error";
import { TeamAlreadyExistsError } from "./errors/TeamAlreadyExists.error";
import { TeamNotFoundError } from "./errors/TeamNotFound.error";
import { TeamEntity } from "./team.entity";
import { TeamGuard } from "./team.guard";
import { TeamRepository } from "./team.repository";

export interface TeamDTO {
    name: TeamEntity['name'];
}

export class TeamService {
    constructor(private readonly teamRepository: TeamRepository, private readonly teamGuard: TeamGuard) {}

    public async add(dto: TeamDTO) {
        //validation
        const isValid = this.teamGuard.isValidAddTeamDTO(dto);
        if (!isValid) throw new InvalidUserTeamDataError();
        
        //checking if the team exists in db
        const teamExists = await this.teamGuard.checkIfTeamExists(dto);
        if (teamExists) throw new TeamAlreadyExistsError();

        //adding a new team
        const team = new TeamEntity().setName(dto.name);
        return this.teamRepository.create(team);
    }

    public async getAllTeams() {
        return this.teamRepository.retrieveAll();
    }

    public async update(dto: TeamDTO, updateDto: TeamDTO) {
        const isValidDto = this.teamGuard.isValidAddTeamDTO(dto);
        if (!isValidDto) throw new InvalidUserTeamDataError();
        const isValidUpdate = this.teamGuard.isValidAddTeamDTO(updateDto);
        if (!isValidUpdate) throw new InvalidUserTeamDataError();

        const teamExists = await this.teamGuard.checkIfTeamExists(dto);
        if (!teamExists) throw new TeamNotFoundError();
        
        const team = new TeamEntity().setName(dto.name);
        const update = new TeamEntity().setName(updateDto.name);

        return this.teamRepository.updateByName(team, update);
    }

    public async delete(dto: TeamDTO) {
        const isValid = this.teamGuard.isValidAddTeamDTO(dto);
        if (!isValid) throw new InvalidUserTeamDataError();

        const teamExists = await this.teamGuard.checkIfTeamExists(dto);
        if (!teamExists) throw new TeamNotFoundError();
    
        return this.teamRepository.delete(dto.name);
    }

}