// import { Parser } from 'node-sql-parser';

import { Pool } from 'pg';

//change this for production usage
//--------
const removeIt = { ssl: { rejectUnauthorized: false } }

const poolOptions = {
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB_NAME,
  user: process.env.USER,
  password: process.env.PASS,
  max: 20,
}

console.log('dont foget to remove this dev option on prod')
const pool = new Pool({ ...poolOptions, ...removeIt });
//----------

export const runQuery = (queryText) => new Promise((resolve) => {
  pool.connect((con_err, client, done) => {
    if (con_err) {
      console.error(con_err);
      resolve();
    }
    client.query(queryText, (q_err, res) => {
      done();
      if (q_err) {
        console.error(q_err);
        resolve()
      } else {
        resolve(res)
      }
    })
  })
})

const normalize = (queryText) => queryText.replace(/\n/g, '').replace(/  +/g, ' ').trim()

export const getSelectQuery = (tableName, fieldsNames, conditions) => {
  let fieldsString, conditionsString
  const withFields = fieldsNames && fieldsNames.length > 0;
  if (withFields) fieldsString = fieldsNames.join(', ');

  const withConditions = conditions && conditions.length > 0;
  if (withConditions) conditionsString = conditions.join(' and ')

  const query = `
    select ${withFields ? fieldsString : '*'} 
    from ${tableName}
    ${withConditions ? 'where ' + conditionsString : ''}
  `;
  return normalize(query);
}

export const getInsertQuery = (tableName, fieldsNames, values) => {
  if (!fieldsNames) return;
  const fieldsString = fieldsNames.join(', ');

  if (!values) return;
  const valuesString = values.join("', '")

  const query = `
    insert into ${tableName} (${fieldsString}) 
    values ('${valuesString}')
    RETURNING *
  `;
  return normalize(query);
}
