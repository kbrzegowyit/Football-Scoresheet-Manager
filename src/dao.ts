import sqlite3 from "sqlite3";
import { AppDAO } from "./types";

export class DAO implements AppDAO {
    private readonly db;
    
    constructor(dbFilePath: string) {
        console.log('DAO!! :D', dbFilePath);
        this.db = new sqlite3.Database(dbFilePath, (err: any) => {
            if (err) {
                return console.error(err.message);
            }
        });
        console.log('Connected to the database.');
    }

    public async run(sql: string, params: string[]) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (this: any, err: any) {
                if (err) {
                    console.log('Error running sql', sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }   
            });
        });
    }

    public async get(sql: string, params: string[]) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, function (err: any, result: any) {
                if (err) {
                    console.log('Error running sql', sql);
                    console.log(err);
                    reject(err);
                }   
                resolve(result);
            });
        });
    }

    public async all(sql: string, params: string[]) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, function (err: any, rows: any) {
                if (err) {
                    console.log('Error running sql', sql);
                    console.log(err);
                    reject(err);
                }   
                resolve(rows);
            });
        });
    }
}