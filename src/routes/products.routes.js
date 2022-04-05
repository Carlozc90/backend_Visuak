import { Router } from "express";

import {
  getAllSql,
  createNewProduct,
  getLogById,
  deleteLogById,
  getLogCountController,
  editarLogById,
  loginControllerLayer,
  getIdControllerLayer,
  getControllerLayerDashb,
  postControllerLayerCreacion,
  getControllerLayerBuscador,
  patchControllerLayerEdicion,
  deleteControllerLayerSocio,
} from "../controllers/products.controller";

const router = Router();

// router.get("/products", (req, res) => res.send("products!!!"));

router.get("/sql", getAllSql);

router.post("/sql", createNewProduct);

router.get("/sql/count", getLogCountController);

router.get("/sql/:id", getLogById);

router.delete("/sql/:id", deleteLogById);

router.put("/sql/:id", editarLogById);

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
