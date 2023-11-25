export class TeamEntity {
    private id: string = '';
    private name = '';
    
    public setId(id: number) {
        this.id = id.toString();
        return this;
    }

    public getId(): string {
        return this.id.toString();
    }

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public getName(): string {
        return this.name;
    }
}