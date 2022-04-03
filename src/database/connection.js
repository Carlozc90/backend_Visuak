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

async function getConnection() {
  const pool = await sql.connect(dbSettings);
  const result = await pool.request().query("SELECT 1");
  console.log(result);
}

getConnection();
