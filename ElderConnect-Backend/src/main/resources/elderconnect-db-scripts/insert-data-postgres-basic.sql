CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date)
VALUES ('111.111.111-11', 'Maria de Olinda', 'maria@email.com', crypt('12345678', gen_salt('bf')), '(35) 99191-9191',
        'IDOSO', '1938-04-21');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date)
VALUES ('222.222.222-22', 'João Silva', 'joao@email.com', crypt('23456788', gen_salt('bf')), '(35) 99999-9999', 'IDOSO',
        '1945-06-27');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date)
VALUES ('101.101.101-10', 'José da Silva', 'josesilva@email.com', crypt('87654321', gen_salt('bf')), '(35) 99876-5432', 'IDOSO',
        '1948-03-15');

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

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date, availability_schedule,
                       street_address, specialization, city, neighborhood, experience)
VALUES ('666.666.666-66', 'Ana Paula Souza', 'ana.paula@email.com', crypt('12345678', gen_salt('bf')), '(35) 98877-1122',
        'CUIDADOR', '1990-05-15',
        'Todos os dias - 07:00 às 11:00', 'Rua Augusto Gondim, 222',
        'Cuidados com Mobilidade & Enfermagem Básica', 'Goiânia', 'Centro',
        '5 anos de experiência. Enfermeira de formação com foco em reabilitação de idosos, administração correta de medicamentos e suporte diário.');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date, availability_schedule,
                       street_address, specialization, city, neighborhood, experience)
VALUES ('777.777.777-77', 'Carlos Eduardo Lima', 'carlos.lima45@email.com', crypt('CELCELCEL', gen_salt('bf')), '(35) 99112-3434',
        'CUIDADOR', '1992-08-12',
        'Sexta,Sabádo e Domingo - 16:00 às 20:00', 'Rua Adolfo Olinto, 45',
        'Acompanhamento Geriátrico e Companhia', 'Pouso Alegre', 'Centro',
        '3 anos de experiência. Profissional dedicado ao bem-estar e entretenimento de idosos, com facilidade para caminhadas e conversas.');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date, availability_schedule,
                       street_address, specialization, city, neighborhood, experience)
VALUES ('888.888.888-88', 'Mariana Ribeiro', 'mariana.ribeiro@email.com', crypt('24753681', gen_salt('bf')), '(35) 98833-5566',
        'CUIDADOR', '1991-03-20',
        'Todos os dias - Tempo integral', 'Rua Nova, 91',
        'Cuidadora Especializada em Alzheimer & Parkinson', 'Itajubá', 'Boa Vista',
        '4 anos de experiência. Especialista em cuidados a pacientes com doenças neurodegenerativas.');

INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type, birth_date, availability_schedule,
                       street_address, specialization, city, neighborhood, experience)
VALUES ('999.999.999-99', 'Maria Silva', 'maria.silva@email.com', crypt('TYRFHGSE', gen_salt('bf')), '(35) 99988-0505',
        'CUIDADOR', '1989-09-10',
        'Segunda, Quarta e Sextas - Tempo integral', 'Rua Adelino Carneiro Pinto, 68',
        'Cuidados Gerais & Acompanhamento', 'Santa Rita do Sapucaí', 'Centro',
        '6 anos de experiência no acompanhamento e cuidado integral de idosos, com referências locais.');


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

INSERT INTO medication_schedule(dosage_instructions, intake_time, senior_id, medication_id)
VALUES('Tomar em jejum ou antes do almoço','12:00',3,3);


INSERT INTO medication_schedule(dosage_instructions, intake_time, senior_id, medication_id)
VALUES('Sem instruções','07:30',3,4);

INSERT INTO contract
(contract_number, start_date, contract_value, status, working_hours, description, senior_id, caregiver_id)
VALUES ('ECCT-TESTE-001', '2026-09-25', 1800.00, 'PENDENTE', 'Todas as sextas - 08:00 às 12:00',
        'Acompanhamento e cuidados gerais', 1, 4);

INSERT INTO contract
(contract_number, start_date, contract_value, status, working_hours, description, senior_id, caregiver_id)
VALUES ('ECCT-TESTE-002', '2026-09-01', 2100.00, 'ATIVO', 'Segunda a quarta - 13:00 às 18:00',
        'Acompanhamento domiciliar', 1, 5);

INSERT INTO contract
(contract_number, start_date, end_date, contract_value, status, working_hours, description, senior_id, caregiver_id)
VALUES ('ECCT-TESTE-003', '2026-07-01', '2026-08-31', 1900.00, 'COMPLETO',
        '25 horas semanais',
        'Acompanhamento e administração de medicamentos', 2, 6);

INSERT INTO contract
(contract_number, start_date, end_date, contract_value, status, working_hours, description, rating, comment, senior_id,
 caregiver_id)
VALUES ('ECCT-TESTE-004', '2026-05-01', '2026-06-30', 1700.00, 'COMPLETO',
        'Segunda, quarta e sexta - 08:00 às 14:00',
        'Acompanhamento durante atividades diárias',
        5, 'Excelente profissional',
        1, 8);

INSERT INTO contract
(contract_number, start_date, contract_value, status, working_hours, description, senior_id,
 caregiver_id)
VALUES ('ECCT-TESTE-005', '2026-09-25', 1800.00, 'ATIVO',
        'Segunda a sexta - 08:00 às 12:00',
        'Acompanhamento regular solicitado via plataforma.',3,10);

INSERT INTO contract
(contract_number, start_date, end_date, contract_value, status, working_hours, description, rating, comment, senior_id,
 caregiver_id)
VALUES ('ECCT-TESTE-006', '2026-07-01', '2026-08-02', 1532.00, 'COMPLETO',
        'Segunda até quarta - 08:00 às 16:00',
        'Acompanhamento nos exames médicos. Diabetes tipo 3 - Cuidado com a alimentação',
        5, 'Muito carinhosa e dedicada. Recomendo fortemente!',
        1, 6);

INSERT INTO contract
(contract_number, start_date, end_date, contract_value, status, working_hours, description, rating, comment, senior_id,
 caregiver_id)
VALUES ('ECCT-TESTE-007', '2026-05-30', '2026-09-10', 2000.00, 'COMPLETO',
        'Sabádos e Domingo - 8:00 às 20:00',
        'Acompanhar durante atividades diárias e Administrar seu medicamentos. Contato de emergencia: Filha Rosalina: (35) 99898-0909 e Filho Paulo: (35) 998765-4321. Precisa de supervisionado o tempo todo.',
        5, 'Excelente profissional, muito pontual e atenciosa com meu pai',
        2, 9);

INSERT INTO contract
(contract_number, start_date, end_date, contract_value, status, working_hours, description, rating, comment, senior_id,
 caregiver_id)
VALUES ('ECCT-TESTE-008', '2026-05-15', '2026-07-15', 1500.00, 'COMPLETO',
        'Segunda, quarta e sexta - 08:00 às 14:00',
        'Acompanhamento durante atividades diárias e na administração de medicamentos',
        4, 'Ótima experiência no acompanhamento diário e administração dos medicamentos.',
        2, 8);