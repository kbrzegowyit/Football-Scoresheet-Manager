export class TeamAlreadyExistsError extends Error {
    constructor() {
        super('The team already exists.');
        this.name = 'TeamAlreadyExists';
    }
}