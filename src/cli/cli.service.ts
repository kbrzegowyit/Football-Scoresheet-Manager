import readline from 'readline';
import { TeamService } from '../Team/team.service';
import { LeagueService } from '../League/league.service';
import { StatisticsService } from '../Statistics/statistics.service';
import { BASE_MENU_OPTIONS, InputQuestions, Menu, Messages, NAVIGATION_MENU_OPTIONS } from './types';

export class CLIService {
    private readonly readline;

    constructor(private readonly teamService: TeamService, private readonly leagueService: LeagueService, private readonly statisticsService: StatisticsService) {
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.clearScreen();
        this.displayMainMenu();
        this.readline.on('close', () => {
            console.log('Goodbye!');
            process.exit(0);
        });
    }

    private async displayMainMenu() {
        this.displayManuOptions(BASE_MENU_OPTIONS);
        const choice = await this.readUserInput(InputQuestions.READ_OPTION_CHOICE);
        this.clearScreen();
        switch (choice) {
            case '1':
                await this.displayAllLeagues();
                break;
            case '2':
                await this.displayAllTeams();
                break;
            case '3':
                await this.displayAddTeam();
                break;
            case '4':
                await this.displayAddLeague();
                break;
            case '5':
                await this.displayAddStatistics();
                break;
            case '6':
                await this.displayLeagueScoresheet();
                break;
            case '7':
                this.readline.close();
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
                await this.displayMainMenu();
                break;
            default:
                this.warnMessage(Messages.SELECT_OPTION_WARN);
                await this.displayMainMenu();
                break;
        }
    }

    private async displayAllLeagues() {
        const allLeagues = await this.leagueService.getAllLeagues();
        console.table(allLeagues, ['id', 'name']);
        await this.displayNavigationMenu();
    }

    private async displayAllTeams() {
        const allTeams = await this.teamService.getAllTeams();
        console.table(allTeams, ['id', 'name']);
        await this.displayNavigationMenu();
    }

    private async displayAddTeam() {
        const str = await this.readUserInput(InputQuestions.READ_TEAM_NAME);
        try {
            const name = str.trim();
            await this.teamService.add({ name });
            this.clearScreen();
            this.successMessage(Messages.ADD_TEAM_SUCCESS);
            await this.displayMainMenu();   
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
    }

    private async displayAddLeague() {
        const str = await this.readUserInput(InputQuestions.READ_LEAGUE_NAME);
        try {
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
            this.failMessage(error.message);
        }
        await this.displayMainMenu();
    }

    private async displayLeagueScoresheet() {
        try {
            let leagueName = await this.readUserInput(InputQuestions.READ_LEAGUE_NAME);
            const scoresheet = await this.statisticsService.getScoresheet(leagueName);
            const scoresheetPretty = scoresheet.map((row, index) => ({ position: index + 1, team: row.team_name, matches: row.rounds, points: row.points }));
            this.clearScreen();
            console.log(scoresheet[0].league_name);
            console.table(scoresheetPretty);
            await this.displayNavigationMenu();   
        } catch (error: any) {
            this.clearScreen();
            this.failMessage(error.message);
            await this.displayMainMenu();
        }
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
            console.log(`${index}. ${menu[option].label}`)
            index++;
        }
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
