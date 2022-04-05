import { Router } from "express";

import {
  getProducts,
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

router.get("/products", getProducts);

router.post("/products", createNewProduct);

router.get("/products/count", getLogCountController);

router.get("/products/:id", getLogById);

router.delete("/products/:id", deleteLogById);

router.put("/products/:id", editarLogById);

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
