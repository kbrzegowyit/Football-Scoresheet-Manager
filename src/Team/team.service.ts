import { InvalidUserTeamDataError } from "./errors/InvalidUserTeamData.error";
import { TeamAlreadyExistsError } from "./errors/TeamAlreadyExists.error";
import { TeamEntity } from "./team.entity";
import { TeamGuard } from "./team.guard";
import { TeamRepository } from "./team.repository";

// najprawdopodobniej potrzebna modyfikacja ukrycia entity, tak jak przyjmuje dto, tak samo powinienem zwracać odpowiedni obiekt (ale jaka jest jego poprawna nazwa???)

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

}