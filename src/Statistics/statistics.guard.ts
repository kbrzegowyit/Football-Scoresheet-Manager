import { Points } from "./statistics.entity";
import { StatisticsDTO } from "./statistics.service";

export class StatisticsGuard {
    public isValidAddLeagueDTO(dto: StatisticsDTO): boolean {
        return !!dto.leagueName.length && !!dto.teamName.length && this.arePointsValid(dto.points);
    }

    private arePointsValid(points: string): boolean {
        return Object.values(Points).includes(+points);
    }
}