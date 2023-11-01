export class LeagueEntity {
    private name = '';
    
    public setName(name: string) {
        this.name = name;
        return this;
    }

    public getName(): string {
        return this.name;
    }
}