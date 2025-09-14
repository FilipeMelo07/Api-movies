
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}


async function setup() {
    const db = await openDb();
    // Cria a tabela 'filmes' se ela não existir
    await db.exec(`
        CREATE TABLE IF NOT EXISTS filmes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            ano INTEGER NOT NULL
        )
    `);

    await db.close();
}

setup();