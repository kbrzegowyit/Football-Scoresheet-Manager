import { LeagueGuard } from "./League/league.guard.js";
import { LeagueRepository } from "./League/league.repository.js";
import { LeagueService } from "./League/league.service.js";
import { StatisticsGuard } from "./Statistics/statistics.guard.js";
import { StatiscticsRepository } from "./Statistics/statistics.repository.js";
import { StatisticsService } from "./Statistics/statistics.service.js";
import { TeamGuard } from "./Team/team.guard.js";
import { TeamRepository } from "./Team/team.repository.js";
import { TeamService } from "./Team/team.service.js";
import { CLIService } from "./cli/cli.service.js";
import { DAO } from "./dao.js";
import { Quicksort } from "./sort/quicksort.js";


// asign team to league
//Readme

export class Main {
    public static async start() {
        const dao = new DAO('./db.sqlite3');
        const teamRepository = new TeamRepository(dao);
        const leagueRepository = new LeagueRepository(dao);
        const statisticsRepository = new StatiscticsRepository(dao);

        await teamRepository.createTable();
        await leagueRepository.createTable();
        await statisticsRepository.createTable();

        const teamGuard = new TeamGuard(teamRepository);
        const leagueGuard = new LeagueGuard(leagueRepository);
        const statisticsGuard = new StatisticsGuard();

        const sorter = new Quicksort();

        const teamService = new TeamService(teamRepository, teamGuard);
        const leagueService = new LeagueService(leagueRepository, leagueGuard);
        const statisticsService = new StatisticsService(
            statisticsRepository, 
            statisticsGuard, 
            teamRepository, 
            teamGuard, 
            leagueRepository, 
            leagueGuard, 
            sorter
        );

        process.on('exit', (code) => {
            if (code === 1) console.log('Fatal error! Closing the application...');
            dao.close()
        });

        try {
            const cli = new CLIService(teamService, leagueService, statisticsService);
            await cli.start();   
        } catch (error) {
            process.exit(1);
        }
    }
}

(() => {
    Main.start();
})()
