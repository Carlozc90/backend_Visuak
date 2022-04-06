export const queries = {
  getAllLog: "SELECT * FROM logVisualk",
  addNewLog:
    "INSERT INTO logVisualk (status, type, body, fecha, usuario, funcion) VALUES (@status, @type, @body, @fecha, @usuario, @funcion)",
};
