export enum TeamSqlCommands {
    INSERT = `INSERT INTO teams (name) VALUES (?)`,
    SELECT_ALL = `SELECT * FROM teams`,
    SELECT_BY_NAME = `SELECT * FROM teams WHERE name = ?`,
    DELETE_BY_NAME = `DELETE FROM teams WHERE name = ?`,
    UPDATE_BY_NAME = `UPDATE teams SET name = ? WHERE name = ?`,
}