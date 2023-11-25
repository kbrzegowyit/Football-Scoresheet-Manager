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
    displayLeagues: { 
        label: 'Leagues',
    },
    displayTeam: {
        label: 'Teams',
    },
    displayStatistics: {
        label: 'Statistics',
    },
    exit: NAVIGATION_MENU_OPTIONS.exit,
};

export const TEAM_MENU_OPTIONS = {
    showTeams: {
        label: 'Show teams',
    },
    addTeam: {
        label: 'Add',
    },
    updateTeam: {
        label: 'Update',
    },
    deleteTeam: {
        label: 'Delete',
    },
    exit: NAVIGATION_MENU_OPTIONS.exit,
};

export const LEAGUE_MENU_OPTIONS = {
    showLeagues: { 
        label: 'Show leagues',
    },
    addLeague: {
        label: 'Add',
    },
    exit: NAVIGATION_MENU_OPTIONS.exit,
};

export const STATISTICS_MENU_OPTIONS = {
    showScoresheet: {
        label: 'Show',
    },
    addStatistics: {
        label: 'Add',
    },
    exit: NAVIGATION_MENU_OPTIONS.exit,
};

export enum InputQuestions {
    READ_TEAM_NAME = 'Enter the team name',
    READ_TEAM_POINTS = 'Enter the team points',
    READ_TEAM_UPDATE_NAME = 'Enter a new team name',
    READ_LEAGUE_NAME = 'Enter the league name',
    READ_OPTION_CHOICE = 'Enter the number of your choice (or press Ctrl+C to exit)',
};

export enum Messages {
    ADD_TEAM_SUCCESS = 'The team has been successfully added.',
    ADD_LEAGUE_SUCCESS = 'The league has been successfully added.',
    ADD_STATISTICS_SUCCESS = 'The statistics has been successfully added.',
    UPDATE_TEAM_SUCCESS = 'The team name has been successfully updated.',
    DELETE_TEAM_SUCCESS = 'The team has been successfully deleted.',
    SELECT_OPTION_WARN = 'Invalid option. Please select a valid option.',
}

export enum CurrentMenu {
    MAIN_MENU = 'main',
    TEAM_MENU = 'team',
    LEAGUE_MENU = 'league',
    STATISTICS_MENU = 'statistics',
}
