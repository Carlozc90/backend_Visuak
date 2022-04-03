import sql from "mssql";

const dbSettings = {
  user: "pos3",
  password: "yr9itk",
  server: "visualdbd.cmm3wq585lxf.sa-east-1.rds.amazonaws.com",
  database: "Postulante3",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
}
