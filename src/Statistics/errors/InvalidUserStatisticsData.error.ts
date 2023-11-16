export class InvalidUserStatisticsDataError extends Error {
    constructor() {
        super('Invalid user input while adding statistics.');
        this.name = 'InvalidUserStatisticsData';
    }
}