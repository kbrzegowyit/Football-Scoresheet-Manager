import { existsSync, unlinkSync } from "fs";
import { TeamGuard } from "../Team/team.guard";
import { TeamRepository } from "../Team/team.repository";
import { TeamDTO, TeamService } from "../Team/team.service";
import { DAO } from "../dao";
import assert from "assert";
import { TeamAlreadyExistsError } from "../Team/errors/TeamAlreadyExists.error";
import { TeamSqlCommands } from "../Team/types";
import { InvalidUserTeamDataError } from "../Team/errors/InvalidUserTeamData.error";
import { TeamNotFoundError } from "../Team/errors/TeamNotFound.error";

let dao: DAO;
let teamRepository: TeamRepository;
let teamGuard: TeamGuard;
let teamService: TeamService;

const mockDependence = {} as any;

describe('Team', () => {
    beforeEach(async () => {
        const dbPath = './integration-team-tests.sqlite3';
        const exists = existsSync(dbPath);
        if (exists) unlinkSync(dbPath);
        dao = new DAO(dbPath, false);
        teamRepository = new TeamRepository(dao);
        teamGuard = new TeamGuard(teamRepository);
        teamService = new TeamService(teamRepository, teamGuard);
        await teamRepository.createTable();
    });

    afterEach(() => {
        dao.close();
    });

    describe('add', async () => {
        it('should throw InvalidUserTeamDataError, when invalid dto', async () => {
            const dto: TeamDTO = { name: '' };
            const teamGuard = new TeamGuard(mockDependence);
            const teamService = new TeamService(mockDependence, teamGuard);

            const result = teamService.add(dto);

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw TeamAlreadyExistsError, when team name exists', async () => {
            const dto: TeamDTO = { name: 'Super Team' };
            await dao.run(TeamSqlCommands.INSERT, [dto.name]);
    
            const result = teamService.add(dto);
    
            await assert.rejects(result, TeamAlreadyExistsError);
        });
    
        it('should add a new team to db and return its id', async () => {
            const dto = { name: 'Super Team' };
    
            const result = await teamService.add(dto);
            const team = await dao.get(TeamSqlCommands.SELECT_BY_NAME, [dto.name]);
    
            assert.deepEqual(result, { id: 1 });
            assert.deepEqual(team, { id: 1, name: dto.name });
        });
    });

    describe('getAllTeams', () => {
        it('should return all teams from db', async () => {
            const teams = [
                {
                    id: 1,
                    name: 'Super Lions',
                },
                {
                    id: 2,
                    name: 'Super Tigers',
                },
            ];
            await dao.run(TeamSqlCommands.INSERT, [teams[0].name]);
            await dao.run(TeamSqlCommands.INSERT, [teams[1].name]);
    
            const result = await teamService.getAllTeams();
    
            assert.deepEqual(result, teams);
        });
    });

    describe('update', () => {
        it('should throw InvalidUserTeamError, when invalid dto', async () => {
            const dto: TeamDTO = { name: '' };
            const update: TeamDTO = { name: 'valid' };
            const teamGuard = new TeamGuard(mockDependence);
            const teamService = new TeamService(mockDependence, teamGuard);

            const result = teamService.update(dto, update);

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw InvalidUserTeamError, when invalid update dto', async () => {
            const dto: TeamDTO = { name: 'valid' };
            const update: TeamDTO = { name: '' };
            const teamGuard = new TeamGuard(mockDependence);
            const teamService = new TeamService(mockDependence, teamGuard);

            const result = teamService.update(dto, update);

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw TeamNotFoundError, when team name not exists', async () => {
            const dto: TeamDTO = { name: 'Super Team' };
            const update: TeamDTO = { name: 'Super Mega Team' };
    
            const result = teamService.update(dto, update);
    
            await assert.rejects(result, TeamNotFoundError);
        });

        it('should update team name, when dtos are valid and team name exists', async () => {
            const dto: TeamDTO = { name: 'Super Team' };
            const update: TeamDTO = { name: 'Super Mega Team' };
            await dao.run(TeamSqlCommands.INSERT, [dto.name]);
    
            await teamService.update(dto, update);
            const team = await dao.get(TeamSqlCommands.SELECT_BY_NAME, [update.name]);
    
            assert.deepEqual(team, { id: 1, name: update.name });
        });
    });

    describe('delete', () => {
        it('should throw InvalidUserTeamDataError, when invalid dto', async () => {
            const dto: TeamDTO = { name: '' };

            const result = teamService.delete(dto);

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw TeamNotFoundError, when team name not exists', async () => {
            const dto: TeamDTO = { name: 'Super Team' };
    
            const result = teamService.delete(dto);
    
            await assert.rejects(result, TeamNotFoundError);
        });

        it('should delete team, when dto is valid and team name exists', async () => {
            const dto: TeamDTO = { name: 'Super Team' };
            await dao.run(TeamSqlCommands.INSERT, [dto.name]);
    
            await teamService.delete(dto);
            const team = await dao.get(TeamSqlCommands.SELECT_BY_NAME, [dto.name]);

            assert.equal(team, undefined);
        });
    });
});