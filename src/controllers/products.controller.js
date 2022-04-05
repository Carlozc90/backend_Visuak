import { getConnection, sql, queries } from "../database";

let sessionCookies = "";
let arrheader = [];
const db = "VISUALK_CL";

const logRegistro = (status, body, type) => {
  console.log(typeof status);
  console.log(typeof body);
  console.log(typeof type);
  const fecha = new Date().toLocaleString("es-ES");
  console.log(typeof fecha);
};

export const getAllSql = async (req, res) => {
  try {
    const pool = await getConnection();
    const resultado = await pool.request().query(queries.getAllLog);
    res.json(resultado.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const postNewSql = async (req, res) => {
  const { status, type, body, fecha } = req.body;
  if (status == null || type == null || body == null || fecha == null) {
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
      .query(queries.addNewLog);

    res.json({ status, type, body, fecha });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/////////////////////////////////////////////////////////////////
// Service Layer

// post Login
export const loginControllerLayer = async (req, res) => {
  var request = require("request").defaults({ jar: true });
  // var request = request.defaults({ jar: true });
  const url = "https://datacenter.visualkgroup.com:58346/b1s/v1/Login";
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "post",
    json: req.body,
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

      sessionCookies = response.body.SessionId;

      if (response.statusCode === 200) {
        arrheader = response.rawHeaders[15].split(";");
        arrheader = arrheader[0].split("=");
      }

      if (arrheader[0] !== "close") {
        res.cookie("ROUTEID", arrheader[1]);
      }

      res.cookie("B1SESSION", sessionCookies, { httpOnly: true });
      res.cookie("CompanyDB", "VISUALK_CL", { httpOnly: true });

      res.json(response.body);
    }
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
  request.get(options, (error, response, body) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);
      //   console.log("3", JSON.stringify(response.body));
      res.json(response.body);
    }
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
  request.get(options, (error, response, body) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);
      //   console.log("3", JSON.stringify(response.body));
      res.json(response.body);
    }

    logRegistro(response.statusCode, body, "GET");
    // console.log("body?.", body);
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
    method: "post",
    json: req.body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };

  request.post(options, (error, response) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);
      res.json(response.body);
    }
  });
};

// get Buscador con los parametros
export const getControllerLayerBuscador = async (req, res) => {
  const id = req.params.id;
  console.log("el id: ", id);
  const sep = id.split(",");
  const parametro = sep[0];
  const contenido = sep[1];

  // console.log(
  //   `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(${parametro}, '${contenido}')`
  // );
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
  request.get(options, (error, response) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);
      //   console.log("3", JSON.stringify(response.body));
      res.json(response.body);
    }
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
    method: "patch",
    json: req.body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };

  request.patch(options, (error, response) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);

      res.json(response.statusCode);
    }
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
    method: "delete",
    // json: req.body,
    postheaders: postheaders,
    strictSSL: false,
    secureProtocol: "TLSv1_method",
  };

  request.delete(options, (error, response) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);

      res.json(response.statusCode);
    }
  });
};
