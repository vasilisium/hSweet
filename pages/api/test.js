const  { runQuery } = require('functions/pg');
const { sendJSON } = require('functions/functions');

export default async (req, res) => {
    const queryText = 'SELECT NOW()';
    
    const qres = await runQuery(queryText);

    sendJSON( res, {
        result: qres.rows
    })
  }
  