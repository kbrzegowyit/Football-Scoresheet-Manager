import { LeagueRepository } from "./League/league.repository.js";
import { Points, StatisticsEntity } from "./Statistic/statistics.entity.js";
import { StatiscticsRepository } from "./Statistic/statistics.repository.js";
import { TeamRepository } from "./Team/team.repository.js";
import { DAO } from "./dao.js";

// Rozpocząć od dodania tabeli statistics

export class Main {
    public static async start() {
        const dao = new DAO('./db.sqlite3');
        const teamRepository = new TeamRepository(dao);
        const leagueRepository = new LeagueRepository(dao);
        const statisticsRepository = new StatiscticsRepository(dao);

        await teamRepository.createTable();
        await leagueRepository.createTable();
        await statisticsRepository.createTable();
        
        // const fcBarcelona = new TeamEntity().setName('Real Madryt');
        // const fcBarcelonaRow = await teamRepository.create(fcBarcelona);

        // const laLiga = new LeagueEntity().setName("La Liga");
        // const laLigaRow = await leagueRepository.create(laLiga);

        const laLigaStatitistics = new StatisticsEntity().setPoints(Points.WIN).setTeamId(1).setLeagueId(1);
        const laLigaStatitisticsRow = await statisticsRepository.create(laLigaStatitistics);
        
        // await statisticsRepository.update(laLigaStatitistics);;

        // console.log('FC Barcelona ID:', fcBarcelonaRow);
        // console.log('La Liga ID:', laLigaRow);
        console.log('La Liga Statistic ID:', laLigaStatitisticsRow);
    }
}

(() => {
    Main.start();
})()
