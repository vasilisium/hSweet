import { getSelectQuery, runQuery } from 'db/pg';

export const select = () => 
    runQuery(getSelectQuery('sensors', ['id','name', 'description'])).then(res=>res);

export const insert = (name, description) => {
    const query = `select new_sensor('${name}', '${description}', null);`
    runQuery(query).then(res=>res);
}