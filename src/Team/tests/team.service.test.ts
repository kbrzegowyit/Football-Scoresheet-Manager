import assert from "assert";
import { TeamDTO, TeamService } from "../team.service";
import { TeamGuard } from "../team.guard";
import { InvalidUserTeamDataError } from "../errors/InvalidUserTeamData.error";
import { TeamAlreadyExistsError } from "../errors/TeamAlreadyExists.error";
import { TeamNotFoundError } from "../errors/TeamNotFound.error";

const mockDependence = {} as any;

describe('TeamService', () => {
    describe('add', () => {
        it('should throw InvalidUserTeamDataError, when invalid dto', async () => {
            const dto: TeamDTO = { name: '' };
            const teamGuard = new TeamGuard(mockDependence);
            const teamService = new TeamService(mockDependence, teamGuard);

            const result = teamService.add(dto);

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw TeamAlreadyExistsError, when team name exists', async () => {
            const teamRepositoryMock = { 
                retrieveOne: () => Promise.resolve({}), 
            };
            const teamGuard = new TeamGuard(<any>teamRepositoryMock);
            const teamService = new TeamService(<any>teamRepositoryMock, teamGuard);

            const result = teamService.add({ name: 'non-empty string' });

            await assert.rejects(result, TeamAlreadyExistsError);
        });

        it('should create a new team, when valid dto and team name not exist', async () => {
            const dto: TeamDTO = { name: 'Super Tigers' };
            const created = { id: 1 };
            const teamRepositoryMock = { 
                retrieveOne: () => Promise.resolve(undefined),
                create: () => Promise.resolve(created), 
            };
            const teamGuard = new TeamGuard(<any>teamRepositoryMock);
            const teamService = new TeamService(<any>teamRepositoryMock, teamGuard);

            const result = await teamService.add(dto);

            assert.deepEqual(result, created);
        });
    });

    describe('getAllTeams', () => {
        it('should return all teams', async () => {
            const teams = [
                { id: 1, name: 'Super Lions' },
                { id: 2, name: 'Mega Tigers' },
            ];
            const teamRepositoryMock = { 
                retrieveAll: () => Promise.resolve(teams),
            };
            const teamService = new TeamService(<any>teamRepositoryMock, mockDependence);

            const result = await teamService.getAllTeams();

            assert.deepEqual(result, teams);
        });
    });

    describe('updates', () => {
        it('should throw InvalidUserTeamDataError, when invalid dto', async () => {
            const dto: TeamDTO = { name: '' };
            const teamGuard = new TeamGuard(mockDependence);
            const teamService = new TeamService(mockDependence, teamGuard);

            const result = teamService.update(dto, <any>{});

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw InvalidUserTeamDataError, when invalid dto', async () => {
            const dto: TeamDTO = { name: 'Super Tigers' };
            const update: TeamDTO = { name: '' };
            const teamGuard = new TeamGuard(mockDependence);
            const teamService = new TeamService(mockDependence, teamGuard);

            const result = teamService.update(dto, update);

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw TeamNotFoundError, when team name not exist', async () => {
            const teamRepositoryMock = { 
                retrieveOne: () => Promise.resolve(undefined),
                updateByName: () => Promise.resolve(),
            };
            const teamGuard = new TeamGuard(<any>teamRepositoryMock);
            const teamService = new TeamService(<any>teamRepositoryMock, teamGuard);

            const result = teamService.update({ name: 'Super Tigers' }, { name: 'Super Mega Tigers' });

            await assert.rejects(result, TeamNotFoundError);
        });

        it('should update the team, when dtos are valid and team name exists', async () => {
            const team = { id: 1, name: 'Super Tigers' };
            const teamRepositoryMock = { 
                retrieveOne: () => Promise.resolve(team),
                updateByName: () => Promise.resolve({ id: 0 }), // default output while updating
            };
            const teamGuard = new TeamGuard(<any>teamRepositoryMock);
            const teamService = new TeamService(<any>teamRepositoryMock, teamGuard);

            const result = await teamService.update({ name: team.name }, { name: 'Super Mega Tigers' });

            assert.deepEqual(result, { id: 0 });
        });
    });

    describe('delete', () => {
        it('should throw InvalidUserTeamDataError, when invalid dto', async () => {
            const dto: TeamDTO = { name: '' };
            const teamGuard = new TeamGuard(mockDependence);
            const teamService = new TeamService(mockDependence, teamGuard);

            const result = teamService.delete(dto);

            await assert.rejects(result, InvalidUserTeamDataError);
        });

        it('should throw TeamNotFoundError, when team name not found', async () => {
            const teamRepositoryMock = { 
                retrieveOne: () => Promise.resolve(undefined),
                delete: () => Promise.resolve(),
            };
            const teamGuard = new TeamGuard(<any>teamRepositoryMock);
            const teamService = new TeamService(<any>teamRepositoryMock, teamGuard);

            const result = teamService.delete({ name: 'Super Tigers' });

            await assert.rejects(result, TeamNotFoundError);
        });

        it('should delete the team, when dto is valid and team name exists', async () => {
            const team = { id: 1, name: 'Super Tiger' };
            const teamRepositoryMock = { 
                retrieveOne: () => Promise.resolve(team),
                delete: () => Promise.resolve({ id: 0 }), //default output while deleting
            };
            const teamGuard = new TeamGuard(<any>teamRepositoryMock);
            const teamService = new TeamService(<any>teamRepositoryMock, teamGuard);

            const result = await teamService.delete({ name: team.name });

            assert.deepEqual(result, { id: 0 });
        });
    });
});