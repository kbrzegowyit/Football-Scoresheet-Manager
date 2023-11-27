import { Points } from "./statistics.entity";
import { AssignTeamToLeagueDTO, StatisticsDTO } from "./statistics.service";

export class StatisticsGuard {
    public isValidAddLeagueDTO(dto: StatisticsDTO): boolean {
        return !!dto.leagueName.length && !!dto.teamName.length && this.arePointsValid(dto.points);
    }

    public isValidAssignTeamToLeagueDTO(dto: AssignTeamToLeagueDTO): boolean {
     return !!dto.leagueName.length && !!dto.teamName.length;
    }

    private arePointsValid(points: string): boolean {
        return Object.values(Points).includes(+points);
    }
}