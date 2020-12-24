-- CREATE TABLE sensors (
--     id serial PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     description VARCHAR(255),
--     meta JSON,

--     CONSTRAINT name_length CHECK (length(name) > 4)
-- );

-- CREATE TABLE groups (
--     id serial PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     description VARCHAR(255),
--     meta JSON,

--     CONSTRAINT name_length CHECK (length(name) > 4)
-- );
-- -- ALTER TABLE groups ADD CONSTRAINT name_length CHECK (length(name) > 4) NOT VALID;
-- -- ALTER TABLE groups VALIDATE CONSTRAINT name_length;

-- CREATE TABLE groups_of_sensors (
--     id serial PRIMARY KEY,
--     group_id integer REFERENCES groups(id) NOT NULL,
--     sensor_id integer REFERENCES sensors(id) NOT NULL
-- );

-- INSERT INTO groups (name, description)
-- VALUES (
--     'default', 'default group'
-- );

-- CREATE OR REPLACE FUNCTION new_sensor
-- (
--     name sensors.name%TYPE, 
--     descr sensors.description%TYPE,
--     meta sensors.meta%TYPE
-- ) RETURNS int AS $$
-- DECLARE
--     new_sensor RECORD;
--     new_id INT;
-- BEGIN
--     INSERT INTO sensors (name, description, meta)
--     VALUES(name, descr, meta)
--     RETURNING id INTO new_sensor;
--     new_id:=new_sensor.id;

--     INSERT INTO groups_of_sensors (group_id, sensor_id)
--     VALUES(1, new_id);

--     RETURN new_id;
-- END;
-- $$ LANGUAGE plpgsql;

-- INSERT INTO groups (name, description)
-- VALUES (
--     'grpup1', 'The Group number one! Hi!!!'
-- );