const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
console.log(`devConfig ${devConfig}`);
const proConfig = process.env.DATABASE_URL; //heroku addons
console.log(`proConfig ${proConfig}`);
console.log("Process env: " + process.env.NODE_ENV);
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

module.exports = pool;
