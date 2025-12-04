const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function openDb(filename = './database.db') {
  return open({
    filename,
    driver: sqlite3.Database
  });
}

async function setup(filename = './database.db') {
  const db = await openDb(filename);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS filmes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      ano INTEGER NOT NULL
    )
  `);
  await db.close();
}

module.exports = { openDb, setup };
