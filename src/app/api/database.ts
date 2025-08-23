import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "database.db");
export const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

interface UserResult {
  lastID: number;
  affectedRows: number;
}

export const apiGet = async (query: string, params: any[]) => {
  return await new Promise<any[]>((resolve, reject) => {
    db.all(query, params, (err: Error, rows) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(rows);
    });
  });
};

export function apiPost(query: string, params: any[]): Promise<UserResult> {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          lastID: this.lastID,
          affectedRows: this.changes
        });
      }
    });
  });
}