export class TeamNotFoundError extends Error {
    constructor() {
        super('The team does not exist.');
        this.name = 'TeamNotFound';
    }
}