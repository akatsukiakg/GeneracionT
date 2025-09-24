CREATE TABLE Mascotas (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(50),
    tipo VARCHAR(30),
    edad INTEGER,
    peso DECIMAL(5,2)
);

INSERT INTO Mascotas (id, nombre, tipo, edad, peso) VALUES (1, 'Luna', 'Perro', 3, 15.50);
INSERT INTO Mascotas (id, nombre, tipo, edad, peso) VALUES (2, 'Max', 'Gato', 5, 4.20);
INSERT INTO Mascotas (id, nombre, tipo, edad, peso) VALUES (3, 'Bella', 'Perro', 2, 8.75);
INSERT INTO Mascotas (id, nombre, tipo, edad, peso) VALUES (4, 'Charlie', 'Pájaro', 1, 0.15);
INSERT INTO Mascotas (id, nombre, tipo, edad, peso) VALUES (5, 'Lucy', 'Gato', 4, 3.80);

SELECT * FROM Mascotas;

SELECT * FROM Mascotas WHERE tipo = 'Perro';

SELECT * FROM Mascotas ORDER BY edad DESC;