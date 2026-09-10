DROP TABLE IF EXISTS contract;
DROP TABLE IF EXISTS senior_caregiver;
DROP TABLE IF EXISTS medication_schedule;
DROP TABLE IF EXISTS medication;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS user_model;

CREATE TABLE user_model(
id SERIAL PRIMARY KEY,
cpf varchar(14) not null,
fullname varchar(100) not null,
email varchar(100) not null,
password varchar(32) not null,
phone_number varchar(20) not null,
user_type varchar(8) CHECK(user_type in('IDOSO','CUIDADOR')),
birth_date date not null,
availability_schedule varchar(100),
street_address varchar(150),
specialization varchar(100),
city varchar(100),
neighborhood varchar(100),
experience text,
UNIQUE(email,cpf)
);

CREATE TABLE message(
id SERIAL PRIMARY KEY,
text text not null,
sent_at timestamp not null,
sender_id int not null REFERENCES user_model(id) ON DELETE CASCADE,
recipient_id int not null REFERENCES user_model(id) ON DELETE CASCADE
);

CREATE TABLE medication(
id SERIAL PRIMARY KEY,
medication_name varchar(100) not null,
dose varchar(50) not null
);

CREATE TABLE medication_schedule(
id SERIAL PRIMARY KEY,
dosage_instructions varchar(100) not null,
intake_time varchar(50) not null,
senior_id int REFERENCES user_model(id) ON DELETE CASCADE,
medication_id int REFERENCES medication(id) ON DELETE CASCADE,
UNIQUE (senior_id, medication_id)
);


CREATE TABLE senior_caregiver(
id SERIAL PRIMARY KEY,
senior_id int REFERENCES user_model(id) ON DELETE CASCADE,
caregiver_id int REFERENCES user_model(id) ON DELETE CASCADE,
UNIQUE (senior_id, caregiver_id)
);

CREATE TABLE contract(
id SERIAL PRIMARY KEY,
contract_number varchar(50) not null UNIQUE,
start_date date not null,
end_date date,
contract_value decimal(10,2) not null,
status varchar(9) CHECK(status in('PENDENTE','ATIVO','COMPLETO','CANCELADO')),
working_hours varchar(50) not null,
description text,
rating int,
comment text,

senior_id int REFERENCES user_model(id) ON DELETE CASCADE,
caregiver_id int REFERENCES user_model(id) ON DELETE CASCADE
);
