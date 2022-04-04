import axios from "axios";
import { getConnection, sql, queries } from "../database";

let sessionCookies = "";
let arrheader = [];
const db = "VISUALK_CL";

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

export const postLoginLayer = async (req, res) => {
  const request = require("request");
  const url = "https://datacenter.visualkgroup.com:58346/b1s/v1/Login";
  const body = {
    CompanyDB: "VISUALK_CL",
    UserName: "postulante3",
    Password: "123qwe",
  };
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "post",
    json: body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);
      console.log("3", JSON.stringify(response.body));
      // console.log("4", response.rawHeaders);
      res.json(response.body);

      sessionCookies = response.body.SessionId;
      arrheader = response.rawHeaders[15].split(";");
      arrheader = arrheader[0].split("=");
    }
  });
};

// export const getSocioById = async (req, res) => {
//   try {
//     const data = await axios(
//       `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS001')`,
//       {
//         withCredentials: true,
//       }
//     )
//       .catch(function (error) {
//         // respuesta del servidor error
//         if (error.response) {
//           console.log(error.response.data);
//         }
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => console.error("Error:", error))
//       .then(function (response) {
//         console.log(response);
//       });

//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getSocioById = async (req, res) => {
  res.cookie(`B1SESSION`, sessionCookies);
  res.cookie(`CompanyDB`, db);
  res.cookie(`ROUTEID`, arrheader[1]);

  const { id } = req.params;
  const request = require("request");
  const url = `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS003')`;
  const body = {};
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "get",
    json: body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };
  // request.cookie("key1=value1");
  request.get(options, (error, response, body) => {
    if (error) {
      console.log("1", error);
    } else {
      // console.log("respuestacookis", req.cookies);
      console.log("2", response.statusCode);
      console.log("3", JSON.stringify(response.body));
      res.json(response.body);
    }
  });
};

export const losBenditosCookis = async (req, res) => {
  // res.clearCookie();
  res.cookie(`B1SESSION`, sessionCookies);
  res.cookie(`CompanyDB`, db);
  res.cookie(`ROUTEID`, arrheader[1]);

  // res.send("Cookie have been saved successfully");

  console.log("antes", req.cookies);
  console.log("despues", res.cookies);
  res.send(req.cookies);
};

export const resolviendo = async (req, res) => {
  console.log("nodo-> ", arrheader[1]);
  console.log("session-> ", sessionCookies);
  console.log("ladb-> ", db);
};
