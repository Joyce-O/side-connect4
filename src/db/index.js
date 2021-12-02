require("dotenv").config();
import mysql from "mysql2";
import { games, gridCells, players } from "./models";

export let pool;
pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PSWD,
});

if (process.env.NODE_ENV == "test") {
  pool = mysql.createPool({
    host: process.env.DB_HOST_TEST,
    user: process.env.DB_USER_TEST,
    database: process.env.DB_NAME_TEST,
    password: process.env.DB_PSWD_TEST,
  });
}

export const initDBTables = () => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(async (err, connection) => {
      if (err) return reject(err.code);
      connection.changeUser(
        { database: process.env.DB_NAME },
        function (errors) {
          if (errors) return reject(errors.code);
          createTables(connection);
        }
      );
      connection.release();
    });

    resolve("Database is connected successfully !");
  });
};

export async function createTables(dbConnectionPool) {
  try {
    const game = await dbConnectionPool.promise().query(games);
    console.log("games 💠 table created", game);

    const grid = await dbConnectionPool.promise().query(gridCells);
    console.log("gridCells 💠 table created", grid);

    const player = await dbConnectionPool.promise().query(players);
    console.log("players 💠 table created", player);
  } catch (error) {
    console.log("table creation failed with error::", error.code);
  }
}
