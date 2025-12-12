CREATE DATABASE IF NOT EXISTS renginiu_db;
USE renginiu_db;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pavadinimas VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vartotojai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vardas VARCHAR(50) NOT NULL,
    el_pastas VARCHAR(100) NOT NULL UNIQUE,
    slaptazodis VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS kategorijos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pavadinimas VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS renginiai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pavadinimas VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES kategorijos(id)
);

INSERT INTO roles (pavadinimas) VALUES ('admin'), ('user');

INSERT INTO vartotojai (vardas, el_pastas, slaptazodis, role_id) VALUES
('Jonas', 'jonas@example.com', '1234', 1),
('Ona', 'ona@example.com', 'password', 2);

INSERT INTO kategorijos (pavadinimas) VALUES ('Muzika'), ('Sportas'), ('Menai'), ('Technologijos');

INSERT INTO renginiai (pavadinimas, data, category_id) VALUES
('Koncertas Vilniuje', '2025-12-20', 1),
('Futbolo varžybos', '2025-12-25', 2),
('Dailės paroda', '2025-12-18', 3),
('Tech konferencija', '2025-12-22', 4);
