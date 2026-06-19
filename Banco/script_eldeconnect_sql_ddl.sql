begin;
create table if not exists usuario(
	id serial primary key,
	cpf varchar(14) not null unique,
	nome varchar(100) not null,
	email varchar(100) not null,
	senha varchar(32) not null,
	telefone varchar(20) not null,
	tipo char(1) check(tipo in('I','C')),-- 'I' para Idoso, 'C' para Cuidador
	-- Atributos da Subclasse (Idoso)
	data_nascimento date,
	-- Atributos da Subclasse (Cuidador)
	disponibilidade_horario varchar(100),
    logradouro varchar(150),
    especializacao varchar(100),
    cidade varchar(100),
    bairro varchar(100),
    experiencia text
	);

commit;

begin;

create table if not exists mensagem(
    id serial primary key,
    texto text not null,
    datahora timestamp not null,
    id_remetente int not null references usuario(id) on delete cascade,
    id_destinatario int not null references usuario(id) on delete cascade
);

commit;

begin;
create table if not exists medicamento(
    id serial primary key,
    nome varchar(100) not null,
    dose varchar(50) not null
);
commit;

begin;
create table if not exists utiliza(
	id serial primary key,
	unique (id_idoso, id_medicamento),
	posologia varchar(100) not null,
    horario varchar(50) not null,
    id_idoso int references usuario(id) on delete cascade,
    id_medicamento int references medicamento(id) on delete cascade
);

commit;

begin;
create table if not exists idoso_cuidador(
	id serial primary key,
    id_idoso int references usuario(id) on delete cascade,
    id_cuidador int references usuario(id) on delete cascade, 
	unique (id_idoso, id_cuidador) 
);

commit;

begin;
create table if not exists contrato(
    id serial primary key,
    numero_contrato varchar(50) not null unique,
    avaliacao int,
    comentario text,
    data_inicio date not null,
    data_fim date,
    valor decimal(10,2) not null,
    status varchar(20) not null,
    carga_horaria varchar(50) not null,
    descricao text,
    
    id_cuidador int not null references usuario(id),
    id_idoso int not null references usuario(id)
);
commit;