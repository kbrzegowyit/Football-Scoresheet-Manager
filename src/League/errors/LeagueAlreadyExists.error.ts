export class LeagueAlreadyExistsError extends Error {
    constructor() {
        super('The league already exists.');
        this.name = 'LeagueAlreadyExists';
    }
}