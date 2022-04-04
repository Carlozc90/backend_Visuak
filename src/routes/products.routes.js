import { Router } from "express";

import {
  getProducts,
  createNewProduct,
  getLogById,
  deleteLogById,
  getLogCountController,
  editarLogById,
  postLogin,
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

router.post("/visualk", postLogin);

export default router;
