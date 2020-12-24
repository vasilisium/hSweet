const { Pool } = require('pg');
export const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB_NAME,
    user: process.env.USER,
    password: process.env.PASS,
    max: 20,
    //change this string for production usage
    ssl: { rejectUnauthorized: false },
});

export const runQuery = async (queryText) => {
    const client = await pool.connect();
    const qRes = await client.query(queryText)
    client.release(true);
    return qRes;
}