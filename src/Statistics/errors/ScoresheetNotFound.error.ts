export class ScoresheetNotFoundError extends Error {
    constructor() {
        super('Scoresheet not found.');
        this.name = 'ScoresheetNotFound';
    }
}