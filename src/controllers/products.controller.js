import { getConnection } from "../database/connection";

export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const resultado = await pool.request().query("SELECT * FROM usuariolog");
  res.json(resultado.recordset);
};
