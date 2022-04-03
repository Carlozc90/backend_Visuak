import { getConnection, sql } from "../database/connection";

export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const resultado = await pool.request().query("SELECT * FROM usuariolog");
  res.json(resultado.recordset);
};

export const createNewProduct = async (req, res) => {
  const { nombre, peticion, fecha } = req.body;

  if (nombre == null || peticion == null || fecha == null) {
    return res.status(400).json({ msg: "Bad Request. LLena todos los campos" });
  }

  const pool = await getConnection();

  await pool
    .request()
    .input("nombre", sql.VarChar, "el nombre2")
    .input("peticion", sql.VarChar, "la peticion2")
    .input("fecha", sql.VarChar, "la fecha2")
    .query(
      "INSERT INTO usuariolog (nombre, peticion, fecha) VALUES (@nombre, @peticion, @fecha)"
    );

  res.json("new productos");
};
