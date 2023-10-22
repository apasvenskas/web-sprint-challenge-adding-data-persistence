// do not make changes to this file
const path = require('path');

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: path.join(__dirname, './data/migrations') },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: path.join(__dirname, './data/database.db3') },
    seeds: { directory: path.join(__dirname, './data/seed/') },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: path.join(__dirname, './data/test.db3')},
  },
};


