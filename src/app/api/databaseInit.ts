// app/api/setupDatabase.ts

import { db } from "./database";

export const initDatatable = () => {
  db.serialize(() => {
    db.run(
      `
        CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
        )
      `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Tabela criada com sucesso.");
      }
    );
  });

  db.serialize(() => {
    db.run(
      `
        CREATE TABLE IF NOT EXISTS address (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        street TEXT NOT NULL,
        number TEXT UNIQUE NOT NULL,
        comp TEXT NULL,
        cep TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT NOT NULL,
        district TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user (id)
      )
      `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Tabela criada com sucesso.");
      }
    );
  });

  db.serialize(() => {
    db.run(
      `
        CREATE TABLE IF NOT EXISTS request (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (product_id) REFERENCES product (id)
      )
      `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Tabela criada com sucesso.");
      }
    );
  });

  db.serialize(() => {
    db.run(
      `
        CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        category TEXT NOT NULL
      )
      `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Tabela criada com sucesso.");
      }
    );
  });
};
