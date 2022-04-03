import { Router } from "express";

import { getProducts } from "../controllers/products.controller";

const router = Router();

// router.get("/products", (req, res) => res.send("products!!!"));

router.get("/products", getProducts);

router.post("/products");

router.get("/products");

router.delete("/products");

router.put("/products");

export default router;
