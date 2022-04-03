export const queries = {
  getAllLog: "SELECT * FROM usuariolog",
  addNewLog:
    "INSERT INTO usuariolog (nombre, peticion, fecha) VALUES (@nombre, @peticion, @fecha)",
  getLogById: "SELECT * FROM usuariolog WHERE Id = @Id",
  deleteLog: "DELETE FROM [Postulante3].[dbo].[usuariolog] WHERE Id = @Id",
  getLogCount: "SELECT COUNT(*) FROM usuariolog",
  editarLogByIdQuery:
    "UPDATE usuariolog SET nombre = @nombre, peticion = @peticion, fecha = @fecha WHERE Id = @Id",
};
