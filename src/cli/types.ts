export type MenuOption = {
    label: string,
};

export type Menu = {
    [key: string]: MenuOption, 
}

export const NAVIGATION_MENU_OPTIONS = {
    exit: {
        label: 'Exit',
    }
}

export const BASE_MENU_OPTIONS = {
    showLeagues: { 
        label: 'Show leagues',
    },
    showTeams: {
        label: 'Show teams',
    },
    addTeam: {
        label: 'Add a team',
    },
    addLeague: {
        label: 'Add a league',
    },
    addStatistics: {
        label: 'Add statistics',
    },
    showScoresheet: {
        label: 'Show the scoresheet',
    },
    exit: NAVIGATION_MENU_OPTIONS.exit,
};

export enum InputQuestions {
    READ_TEAM_NAME = 'Enter the team name',
    READ_LEAGUE_NAME = 'Enter the league name',
    READ_TEAM_POINTS = 'Enter the team points',
    READ_OPTION_CHOICE = 'Enter the number of your choice (or press Ctrl+C to exit)',
};

export enum Messages {
    ADD_TEAM_SUCCESS = 'The team has been successfully added.',
    ADD_LEAGUE_SUCCESS = 'The league has been successfully added.',
    ADD_STATISTICS_SUCCESS = 'The statistics has been successfully added.',
    SELECT_OPTION_WARN = 'Invalid option. Please select a valid option.',
}
