import readline from 'readline';
import { TeamService } from '../Team/team.service';
import { LeagueService } from '../League/league.service';
import { StatisticsService } from '../Statistics/statistics.service';
import { BASE_MENU_OPTIONS, CurrentMenu, InputQuestions, LEAGUE_MENU_OPTIONS, Menu, Messages, NAVIGATION_MENU_OPTIONS, STATISTICS_MENU_OPTIONS, TEAM_MENU_OPTIONS } from './types';

export class CLIService {
    private readonly readline;
    private currentMenu = CurrentMenu.MAIN_MENU;

    constructor(private readonly teamService: TeamService, private readonly leagueService: LeagueService, private readonly statisticsService: StatisticsService) {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.readline.on('close', () => {
            console.log('Goodbye!');
            process.exit(0);
        });
    }

    public async start(): Promise<void> {
        this.clearScreen();
        await this.displayMainMenu();
    }

    private async displayMainMenu() {
        this.currentMenu = CurrentMenu.MAIN_MENU;
        this.displayMenuBar();
        this.displayManuOptions(BASE_MENU_OPTIONS);
        const choice = await this.readUserInput(InputQuestions.READ_OPTION_CHOICE);
        this.clearScreen();
        switch (choice) {
            case '1':
                await this.displayLeagueMenu();
                break;
            case '2':
                await this.displayTeamMenu();
            case '3':
                await this.displayStatisticsMenu();
                break;
            case '4':
                this.readline.close();
                break;
            default:
                this.warnMessage(Messages.SELECT_OPTION_WARN);
                this.displayMainMenu();
                break;
        }
    }

    private async displayTeamMenu() {
        this.currentMenu = CurrentMenu.TEAM_MENU;
        this.displayMenuBar();
        this.displayManuOptions(TEAM_MENU_OPTIONS);
        const choice = await this.readUserInput(InputQuestions.READ_OPTION_CHOICE);
        this.clearScreen();
        switch (choice) {
            case '1':
                await this.displayAllTeams();
                break;
            case '2':
                await this.displayAddTeam();
                break;
            case '3':
                await this.displayUpdateTeam();
            case '4':
                await this.displayDeleteTeam();
                break;
            case '5':
                await this.displayMainMenu();
                break;
            default:
                this.warnMessage(Messages.SELECT_OPTION_WARN);
                this.displayMainMenu();
                break;
        }
    }

    private async displayLeagueMenu() {
        this.currentMenu = CurrentMenu.LEAGUE_MENU;
        this.displayMenuBar();
        this.displayManuOptions(LEAGUE_MENU_OPTIONS);
        const choice = await this.readUserInput(InputQuestions.READ_OPTION_CHOICE);
        this.clearScreen();
        switch (choice) {
            case '1':
                await this.displayAllLeagues();
                break;
            case '2':
                await this.displayAddLeague();
                break;
            case '3':
                await this.displayMainMenu();
                break;
            default:
                this.warnMessage(Messages.SELECT_OPTION_WARN);
                this.displayMainMenu();
                break;
        }
    }

    private async displayStatisticsMenu() {
        this.currentMenu = CurrentMenu.STATISTICS_MENU;
        this.displayMenuBar();
        this.displayManuOptions(STATISTICS_MENU_OPTIONS);
        const choice = await this.readUserInput(InputQuestions.READ_OPTION_CHOICE);
        this.clearScreen();
        switch (choice) {
            case '1':
                await this.displayLeagueScoresheet();
                break;
            case '2':
                await this.displayAddStatistics();
                break;
            case '3':
                await this.displayAssignTeamToLeague();
                break;
            case '4':
                await this.displayMainMenu();
                break;
            default:
                this.warnMessage(Messages.SELECT_OPTION_WARN);
                this.displayMainMenu();
                break;
        }
    }

    private async displayNavigationMenu() {
        this.displayManuOptions(NAVIGATION_MENU_OPTIONS);
        const choice = await this.readUserInput(InputQuestions.READ_OPTION_CHOICE);
        this.clearScreen();
        switch (choice) {
            case '1':
                if (this.currentMenu === CurrentMenu.MAIN_MENU) {
                    await this.displayMainMenu();
                } else if (this.currentMenu === CurrentMenu.TEAM_MENU) {
                    await this.displayTeamMenu();
                } else if (this.currentMenu === CurrentMenu.LEAGUE_MENU) {
                    await this.displayLeagueMenu();
                } else if (this.currentMenu === CurrentMenu.STATISTICS_MENU) {
                    await this.displayStatisticsMenu();
                }
                break;
            default:
                this.warnMessage(Messages.SELECT_OPTION_WARN);
                await this.displayMainMenu();
                break;
        }
    }

    private async displayAllTeams() {
        try {
            const allTeams = await this.teamService.getAllTeams();
            console.table(allTeams, ['id', 'name']);
            await this.displayNavigationMenu();
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }

    }

    private async displayUpdateTeam() {
        try {
            const str = await this.readUserInput(InputQuestions.READ_TEAM_NAME);
            const updateStr = await this.readUserInput(InputQuestions.READ_TEAM_UPDATE_NAME);
            const name = str.trim();
            const updateName = updateStr.trim();
            await this.teamService.update({ name }, { name: updateName });
            this.clearScreen();
            this.successMessage(Messages.UPDATE_TEAM_SUCCESS);
            await this.displayTeamMenu();   
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
    }

    private async displayDeleteTeam() {
        try {
            const str = await this.readUserInput(InputQuestions.READ_TEAM_NAME);
            const name = str.trim();
            await this.teamService.delete({ name });
            this.clearScreen();
            this.successMessage(Messages.DELETE_TEAM_SUCCESS);
            await this.displayTeamMenu();   
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
    }

    private async displayAddTeam() {
        try {
            const str = await this.readUserInput(InputQuestions.READ_TEAM_NAME);
            const name = str.trim();
            await this.teamService.add({ name });
            this.clearScreen();
            this.successMessage(Messages.ADD_TEAM_SUCCESS);
            await this.displayTeamMenu();   
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
    }

    private async displayAllLeagues() {
        try {
            const allLeagues = await this.leagueService.getAllLeagues();
            console.table(allLeagues, ['id', 'name']);
            await this.displayNavigationMenu();
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
    }

    private async displayAddLeague() {
        try {
            const str = await this.readUserInput(InputQuestions.READ_LEAGUE_NAME);
            const name = str.trim();
            await this.leagueService.add({ name });
            this.clearScreen();
            this.successMessage(Messages.ADD_LEAGUE_SUCCESS);
            await this.displayMainMenu();   
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
    }

    private async displayAddStatistics() {
        try {
            let teamName = await this.readUserInput(InputQuestions.READ_TEAM_NAME);
            let leagueName = await this.readUserInput(InputQuestions.READ_LEAGUE_NAME);
            let points = await this.readUserInput(InputQuestions.READ_TEAM_POINTS);
            await this.statisticsService.add({ teamName, leagueName, points });
            this.clearScreen();
            this.successMessage(Messages.ADD_STATISTICS_SUCCESS);
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
        }
        await this.displayMainMenu();
    }

    private async displayLeagueScoresheet() {
        try {
            let leagueName = await this.readUserInput(InputQuestions.READ_LEAGUE_NAME);
            const scoresheet = await this.statisticsService.getScoresheet(leagueName);
            // We reduce the number of rounds by 1 because the first round is not counted beacause of assignment.
            const scoresheetPretty = scoresheet.map((row, index) => ({ position: index + 1, team: row.teamName, matches: row.rounds - 1, points: row.points }));
            this.clearScreen();
            console.log(scoresheet[0].leagueName);
            console.table(scoresheetPretty);
            await this.displayNavigationMenu();   
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
    }

    private async displayAssignTeamToLeague() {
        try {
            let teamName = await this.readUserInput(InputQuestions.READ_TEAM_NAME);
            let leagueName = await this.readUserInput(InputQuestions.READ_LEAGUE_NAME);
            await this.statisticsService.assignTeamToLeague({ teamName, leagueName });
            this.clearScreen();
            this.successMessage(Messages.ASSIGN_TEAM_TO_LEAGUE_SUCCESS);
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
        }
        await this.displayMainMenu();
    }

    private readUserInput(question: InputQuestions): Promise<string> {
        return new Promise((resolve, _reject) => {
            this.readline.question(`${question}:`, async (str) => {
                resolve(str.trim());
            });
        });
    }

    private displayManuOptions(menu: Menu) {
        let index = 1;
        for(const option in menu) {
            console.log(`\u001b[36m${index}. ${menu[option].label}\u001b[0m`)
            index++;
        }
    }

    private displayMenuBar() {
        const filler = (len: number, str: string) => new Array(len).fill(str).join('');
        const dashesCount = 20;
        const str = Array.from(this.currentMenu).map((char) => char.toUpperCase()).join('') + ' ' + 'MENU';
        const leftMargin = Math.floor((dashesCount - str.length) / 2);
        console.log(filler(dashesCount, '-'));
        console.log(`\u001b[35m${leftMargin > 0 ? filler(leftMargin, ' ') + str : str}\u001b[0m`)
        console.log(filler(dashesCount, '-'));
    }

    private successMessage(msg: string): void {
        console.log(`\u001b[32m${msg}\u001b[0m`);
    }

    private failMessage(msg: string): void {
        console.error(`\u001b[31m${msg}\u001b[0m`);
    }

    private warnMessage(msg: string): void {
        console.warn(`\u001b[33m${msg}\u001b[0m`);
    }

    private clearScreen() {
        console.clear();
    }
}
