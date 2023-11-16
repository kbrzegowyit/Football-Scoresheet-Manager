export class LeagueNotFoundError extends Error {
    constructor() {
        super('The league does not exist.');
        this.name = 'LeagueNotFound';
    }
}