CREATE TABLE logintable (
id serial NOT NULL,
login character varying(50) NOT NULL,
email character varying(50) NOT NULL,
password character varying(50) NOT NULL,
PRIMARY KEY (id)
);