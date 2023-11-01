export enum Points {
    WIN = 3,
    DRAW = 1,
    LOSE = 0,
}

export class StatisticsEntity {
    private id: string = '';
    private points = 0;
    private teamId: string = '';
    private leagueId: string = '';

    public setId(id: number) {
        this.id = id.toString();
        return this;
    }

    public getId(): string {
        return this.id.toString();
    }

    public setPoints(points: Points) {
        this.points = points;
        return this;
    }

    public getPoints(): string {
        return this.points.toString();
    }

    public setTeamId(id: number) {
        this.teamId = id.toString();
        return this;
    }

    public getTeamId(): string {
        return this.teamId.toString();
    }

    public setLeagueId(id: number) {
        this.leagueId = id.toString();
        return this;
    }

    public getLeagueId(): string {
        return this.leagueId.toString();
    }

    toString() {
        return 'This beautiful object contains:' + this.points;
    }
}