CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date)
VALUES ('111.111.111-11', 'Maria de Olinda', 'maria@email.com', crypt('12345678', gen_salt('bf')), '(35) 99191-9191',
        'IDOSO', '1938-04-21');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date)
VALUES ('222.222.222-22', 'João Silva', 'joao@email.com', crypt('23456788', gen_salt('bf')), '(35) 99999-9999', 'IDOSO',
        '1945-06-27');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date, availability_schedule,
                       street_address, specialization, city, neighborhood, experience)
VALUES ('333.333.333-33', 'Juliana Mota', 'juliana@email.com', crypt('juju2108', gen_salt('bf')), '(35) 99193-9393',
        'CUIDADOR', '2001-12-01',
        'Segunda a sexta - 08:00 às 18:00', 'Rua das Flores, 120', 'Cuidados gerais com idosos',
        'Santa Rita do Sapucaí', 'Centro', '5 anos de experiência com cuidados domiciliar');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date, availability_schedule,
                       street_address, specialization, city, neighborhood, experience)
VALUES ('444.444.444-44', 'Paulo Santos', 'paulo@email.com', crypt('03456777', gen_salt('bf')), '(35) 94444-5555',
        'CUIDADOR', '1998-05-25',
        'Todos os dias - 18:00 às 06:00', 'Avenida Sapucaí, 450', 'Cuidados noturnos', 'Santa Rita do Sapucaí',
        'Boa Vista', '3 anos trabalhando como cuidador noturno');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date, availability_schedule,
                       street_address, specialization, city, neighborhood, experience)
VALUES ('555.555.555-55', 'Larissa Silva', 'larissa@email.com', crypt('52345564', gen_salt('bf')), '(35) 99595-9595',
        'CUIDADOR', '2005-08-28',
        'Segunda, quarta e sexta - 07:00 às 17:00', 'Rua José Pinto, 81',
        'Acompanhamento e administração de medicamentos', 'Pouso Alegre', 'São Carlos',
        '8 anos de experiência no acompanhamento de idosos');

INSERT INTO medication(medication_name, dose)
VALUES ('Losartana', '50 mg');

INSERT INTO medication(medication_name, dose)
VALUES ('Dipirona', '1 comprimido');

INSERT INTO medication(medication_name, dose)
VALUES ('Omeprazol', '20 mg');

INSERT INTO medication(medication_name, dose)
VALUES ('Loratadina', '1 comprimido');

INSERT INTO medication(medication_name, dose)
VALUES ('Ibuprofeno', '40 mg');

INSERT INTO medication_schedule(dosage_instructions, intake_time, senior_id, medication_id)
VALUES ('Tomar um comprimido', '6:00', 1, 2);

INSERT INTO medication_schedule(dosage_instructions, intake_time, senior_id, medication_id)
VALUES ('Tomar 2 horas antes de dormir', '18:00', 1, 3);

INSERT INTO medication_schedule(dosage_instructions, intake_time, senior_id, medication_id)
VALUES ('Tomar com uma refeição', '12:00', 2, 5);

INSERT INTO medication_schedule(dosage_instructions, intake_time, senior_id, medication_id)
VALUES ('Tomar um comprimido antes do almoço', '10:00', 2, 2);

INSERT INTO medication_schedule(dosage_instructions, intake_time, senior_id, medication_id)
VALUES ('Tomar antes da 16:00 por causa da sonolencia', '12:00', 1, 4);

INSERT INTO contract
(contract_number, start_date, contract_value, status, working_hours, description, senior_id, caregiver_id)
VALUES ('ECCT-TESTE-001', '2026-09-25', 1800.00, 'PENDENTE', 'Todas as sextas - 08:00 às 12:00',
        'Acompanhamento e cuidados gerais', 1, 3);

INSERT INTO contract
(contract_number, start_date, contract_value, status, working_hours, description, senior_id, caregiver_id)
VALUES ('ECCT-TESTE-002', '2026-09-01', 2100.00, 'ATIVO', 'Segunda a quarta - 13:00 às 18:00',
        'Acompanhamento domiciliar', 1, 5);

INSERT INTO contract
(contract_number, start_date, end_date, contract_value, status, working_hours, description, senior_id, caregiver_id)
VALUES ('ECCT-TESTE-003', '2026-07-01', '2026-08-31', 1900.00, 'COMPLETO',
        '25 horas semanais',
        'Acompanhamento e administração de medicamentos', 2, 4);

INSERT INTO contract
(contract_number, start_date, end_date, contract_value, status, working_hours, description, rating, comment, senior_id,
 caregiver_id)
VALUES ('ECCT-TESTE-004', '2026-05-01', '2026-06-30', 1700.00, 'COMPLETO',
        'Segunda, quarta e sexta - 08:00 às 14:00',
        'Acompanhamento durante atividades diárias',
        5, 'Excelente profissional',
        1, 3);