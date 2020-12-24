import { runQuery } from 'db/pg';

export const selectOne = (id) => {
  const query = `
    select gs.group_id, g.name as groupName, s.* 
    from 
      groups as g,
      sensors as s,
      groups_of_sensors as gs
    where 
      gs.sensor_id = s.id and
      gs.group_id = g.id and
      gs.group_id = ${id}
    `;
  return runQuery(query).then(res => res);
}
export const selectAll = () => {
  const query = 'SELECT id, name, description FROM groups';
  return runQuery(query).then(res => res);
}
export const insert = (name, description) => {
  const query = `
    INSERT INTO groups (name, description)
    VALUES ('${name}','${description}')
    RETURNING *
  `;
  return runQuery(query).then(res => res);
}