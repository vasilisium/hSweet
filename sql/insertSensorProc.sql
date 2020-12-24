CREATE OR REPLACE FUNCTION new_sensor
(
    name sensors.name%TYPE, 
    descr sensors.description%TYPE,
    meta sensors.meta%TYPE
) RETURNS int AS $$
DECLARE
    new_sensor RECORD;
BEGIN
    INSERT INTO sensors (name, description, meta)
    VALUES(name, descr, meta)
    RETURNING id INTO new_sensor;

    INSERT INTO groups_of_sensors (group_id, sensor_id)
    VALUES(1, new_sensor.id);

    RETURN new_sensor.id;
END;
$$ LANGUAGE plpgsql;