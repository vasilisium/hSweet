select gs.group_id, g.name as groupName, s.* 
from 
    groups as g,
    sensors as s,
    groups_of_sensors as gs
where 
    gs.sensor_id = s.id and
    gs.group_id = g.id