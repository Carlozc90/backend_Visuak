import path from "path";
import { textfile } from "../../log/file_system";
import { getConnection, sql, queries } from "../database";

let sessionCookies = "";
let arrheader = [];

const logRegistro = (status, body, type) => {
  // console.log(typeof status);
  // console.log(typeof body);
  // console.log(typeof type);
  const fecha = new Date().toLocaleString("es-ES");
  // console.log(typeof fecha);
};

export const getTextFile = async (req, res) => {
  const url = path.join(__dirname, "../../log/TextoLogError.txt");
  res.sendFile(url);
};

export const getAllSql = async (req, res) => {
  try {
    const pool = await getConnection();
    const resultado = await pool.request().query(queries.getAllLog);
    res.json(resultado.recordset);
    textfile(resultado.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const postNewSql = async (req, res) => {
  const { status, type, body, fecha, usuario, funcion } = req.body;
  // console.log("respuesta_>", req.body);

  if (
    status == null ||
    type == null ||
    body == null ||
    fecha == null ||
    usuario == null ||
    funcion == null
  ) {
    return res.status(400).json({ msg: "Bad Request. LLena todos los campos" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("status", sql.Int, status)
      .input("type", sql.VarChar, type)
      .input("body", sql.VarChar, body)
      .input("fecha", sql.VarChar, fecha)
      .input("usuario", sql.VarChar, usuario)
      .input("funcion", sql.VarChar, funcion)
      .query(queries.addNewLog);

    res.json({ status, type, body, fecha, usuario, funcion });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/////////////////////////////////////////////////////////////////
// Service Layer

// post Login
export const loginControllerLayer = async (req, res) => {
  const request = require("request").defaults({ jar: true });
  const url = "https://datacenter.visualkgroup.com:58346/b1s/v1/Login";
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "POST",
    json: req.body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };

  request(options, (error, response) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      sessionCookies = response.body.SessionId;

      arrheader = response.rawHeaders[15].split(";");
      arrheader = arrheader[0].split("=");

      if (arrheader[0] !== "close") {
        res.cookie("ROUTEID", arrheader[1]);
      }
      res.cookie("B1SESSION", sessionCookies, { httpOnly: true });
      res.cookie("CompanyDB", "VISUALK_CL", { httpOnly: true });
      res.json(response);
      return;
    }
    console.log("error Login", error);
    res.json(response);
  });
};

// get obtener por su id
export const getIdControllerLayer = async (req, res) => {
  const id = req.params.id;
  var request = require("request").defaults({ jar: true });
  const url = `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('${id}')`;
  const body = {};
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "GET",
    json: body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };
  request(options, (error, response) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.json(response);
      return;
    }
    console.log("error id", error);
  });
};

// get obtener por su AdditionalId
export const getControllerLayerDashb = async (req, res) => {
  const id = req.params.id;

  var request = require("request").defaults({ jar: true });
  const url = `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(AdditionalID, '${id}')`;
  const body = {};
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "GET",
    json: body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };
  request(options, (error, response, body) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.json(response);
    } else {
      res.json(response);
      console.log("error dash", error);
    }

    logRegistro(response.statusCode, body, "GET");
  });
};

// post Creacion del socio
export const postControllerLayerCreacion = async (req, res) => {
  var request = require("request").defaults({ jar: true });
  const url =
    "https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners";
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "POST",
    json: req.body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };
  request(options, (error, response) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.json(response);
    } else {
      res.json(response);
      console.log("error Creacion", error);
    }
  });
};

// get Buscador con los parametros
export const getControllerLayerBuscador = async (req, res) => {
  const id = req.params.id;
  const sep = id.split(",");
  const parametro = sep[0];
  const contenido = sep[1];

  var request = require("request").defaults({ jar: true });
  const url = `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(${parametro}, '${contenido}')`;
  const body = {};
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "GET",
    json: body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };
  request(options, (error, response) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.json(response);
      return;
    }
    console.log("error parametros", error);
  });
};

// patch Edicion del Socio
export const patchControllerLayerEdicion = async (req, res) => {
  const id = req.params.id;
  var request = require("request").defaults({ jar: true });
  const url = `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('${id}')`;
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "PATCH",
    json: req.body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };
  request(options, (error, response) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.json(response);
      return;
    }
    console.log("error edicion", error);
  });
};

// Eliminacion de un Socio
export const deleteControllerLayerSocio = async (req, res) => {
  const id = req.params.id;
  var request = require("request").defaults({ jar: true });
  const url = `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('${id}')`;
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "DELETE",
    // json: req.body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };
  request(options, (error, response) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      res.json(response);
    }
    console.log("error delete", error);
  });
};
