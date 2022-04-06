import { Router } from "express";

import {
  getTextFile,
  getAllSql,
  postNewSql,
  loginControllerLayer,
  getIdControllerLayer,
  getControllerLayerDashb,
  postControllerLayerCreacion,
  getControllerLayerBuscador,
  patchControllerLayerEdicion,
  deleteControllerLayerSocio,
} from "../controllers/products.controller";

const router = Router();

router.get("/errortxt", getTextFile);

////////////////////////////////////////////////////////

router.get("/sql", getAllSql);

router.post("/sql", postNewSql);

///////////////////////////////////////////////////////

// router.post("/visualk", (req, res) => res.send("visual!!!"));

router.post("/visualk-login", loginControllerLayer);

router.get("/visualk-id/:id", getIdControllerLayer);

router.get("/visualk-dashboard/:id", getControllerLayerDashb);

router.post("/visualk-creacion", postControllerLayerCreacion);

router.get("/visualk-buscador/:id", getControllerLayerBuscador);

router.patch("/visualk-edicion/:id", patchControllerLayerEdicion);

router.delete("/visualk-Eliminar/:id", deleteControllerLayerSocio);

export default router;
