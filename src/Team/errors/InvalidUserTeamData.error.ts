export class InvalidUserTeamDataError extends Error {
    constructor() {
        super('Invalid user input while adding a new team.');
        this.name = 'InvalidUserTeamData';
    }
}