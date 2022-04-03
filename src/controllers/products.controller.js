import { getConnection, sql, queries } from "../database";

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const resultado = await pool.request().query(queries.getAllLog);
    res.json(resultado.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  const { nombre, peticion, fecha } = req.body;
  if (nombre == null || peticion == null || fecha == null) {
    return res.status(400).json({ msg: "Bad Request. LLena todos los campos" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("peticion", sql.VarChar, peticion)
      .input("fecha", sql.VarChar, fecha)
      .query(queries.addNewLog);

    res.json({ nombre, peticion, fecha });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getLogById = async (req, res) => {
  const { id } = req.params;

  const pool = await getConnection();
  const resultado = await pool
    .request()
    .input("Id", id)
    .query(queries.getLogById);
  res.send(resultado.recordset[0]);
};

export const deleteLogById = async (req, res) => {
  const { id } = req.params;

  const pool = await getConnection();
  const resultado = await pool
    .request()
    .input("Id", id)
    .query(queries.deleteLog);
  res.sendStatus(204);
};

export const getLogCountController = async (req, res) => {
  const pool = await getConnection();
  const resultado = await pool.request().query(queries.getLogCount);

  res.json(resultado.recordset[0][""]);
};

export const editarLogById = async (req, res) => {
  const { nombre, peticion, fecha } = req.body;
  const { id } = req.params;
  if (nombre == null || peticion == null || fecha == null) {
    return res.status(400).json({ msg: "Bad Request. LLena todos los campos" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("nombre", sql.VarChar, nombre)
    .input("peticion", sql.VarChar, peticion)
    .input("fecha", sql.VarChar, fecha)
    .input("id", sql.Int, id)
    .query(queries.editarLogByIdQuery);

  res.json({ nombre, peticion, fecha });
};
