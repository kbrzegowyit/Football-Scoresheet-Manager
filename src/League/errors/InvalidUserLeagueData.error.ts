export class InvalidUserLeagueDataError extends Error {
    constructor() {
        super('Invalid user input while adding a new league.');
        this.name = 'InvalidUserLeagueData';
    }
}