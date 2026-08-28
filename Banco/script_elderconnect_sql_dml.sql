begin;

-- Usuários idosos
insert into usuario
(cpf, nome, email, senha, telefone, tipo, data_nascimento)
values
('111.111.111-11', 'Maria de Olinda', 'maria@email.com',
 '12345678', '(35) 99191-9191', 'I', '1938-04-21'),

('222.222.222-22', 'João Silva', 'joao@email.com',
 '23456788', '(35) 99999-9999', 'I', '1945-06-27');

-- Usuários cuidadores
insert into usuario
(cpf, nome, email, senha, telefone, tipo, disponibilidade_horario,
 logradouro, especializacao, cidade, bairro, experiencia)
values
('333.333.333-33', 'Juliana Mota', 'juliana@email.com',
 'juju2108', '(35) 99193-9393', 'C',
 'Segunda a sexta - 08:00 às 18:00', 'Rua das Flores, 120',
 'Cuidados gerais com idosos', 'Santa Rita do Sapucaí', 'Centro',
 '5 anos de experiência com cuidados domiciliares'),

('444.444.444-44', 'Paulo Santos', 'paulo@email.com',
 '03456777', '(35) 94444-5555', 'C',
 'Todos os dias - 18:00 às 06:00', 'Avenida Sapucaí, 450',
 'Cuidados noturnos', 'Santa Rita do Sapucaí', 'Boa Vista',
 '3 anos trabalhando como cuidador noturno'),

('555.555.555-55', 'Larissa Silva', 'larissa@email.com',
 '52345564', '(35) 99595-9595', 'C',
 'Segunda, quarta e sexta - 07:00 às 17:00', 'Rua José Pinto, 81',
 'Administração de medicamentos', 'Pouso Alegre', 'São Carlos',
 '8 anos de experiência no acompanhamento de idosos');

-- Medicamentos
insert into medicamento (nome, dose)
values
('Losartana', '50 mg'),
('Metformina', '850 mg'),
('Dipirona', '20 mg'),
('Omeprazol', '20 mg');

-- Medicamentos utilizados pelos idosos
insert into utiliza (posologia, horario, id_idoso, id_medicamento)
values
('Tomar um comprimido', '08:00', 1, 1),
('Tomar um comprimido após o almoço', '13:00', 1, 2),
('Tomar um comprimido antes de dormir', '21:00', 2, 3),
('Tomar em jejum', '07:00', 2, 4);

-- Relacionamentos entre idosos e cuidadores
insert into idoso_cuidador (id_idoso, id_cuidador)
values
(1, 3),
(1, 5),
(2, 4);

-- Contratos
insert into contrato
(numero_contrato, avaliacao, comentario, data_inicio, data_fim,
 valor, status, carga_horaria, descricao, id_cuidador, id_idoso)
values
('CONT-2026-001', null, null, '2026-08-01', null,
 1800.00, 'ATIVO', '40 horas semanais',
 'Acompanhamento e cuidados gerais', 3, 1),

('CONT-2026-002', 5, 'Excelente profissional', '2026-05-01', '2026-07-31',
 1500.00, 'COMPLETO', '20 horas semanais',
 'Acompanhamento e administração de medicamentos', 5, 1),

('CONT-2026-003', null, null, '2026-09-01', null,
 2100.00, 'PEDENTE', 'Escala noturna',
 'Cuidados durante o período noturno', 4, 2);

commit;