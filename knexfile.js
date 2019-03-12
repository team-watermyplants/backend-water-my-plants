module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/waterPlantsDB.db3"
    },
    useNullAsDefault: true,
    debug: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/testDB.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
