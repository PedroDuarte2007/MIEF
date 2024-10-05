drop database if exists EscolaMIEF;
create database EscolaMIEF;
use EscolaMIEF;
create table MATRICULA(
    id integer primary key auto_increment,
    cpf varchar(20) not null unique,
    nome completo varchar(100) not null, 
    nascimento date not null,
    telefone varchar(50) not null,
    email varchar(50) not null
);
describe MATRICULA;


insert into MATRICULA(cpf, nome completo, nascimento, telefone, email)
values
("111.111.111-11", "Pedro Duarte Naddeu Russo", "2007-01-01", "(19)97134-8235", "pedronaddeu@gmail.com");

select * from MATRICULA;