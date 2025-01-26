module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/db.sqlite",
    },
    migrations: {
      directory: "./database/migrations",
    },
    useNullAsDefault: true,
  },
};
