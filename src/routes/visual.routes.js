import { Router } from "express";

import { postLogin } from "../controllers/visual.controller";

const router = Router();

router.get("/visualk", (req, res) => res.send("products!!!"));

// router.get("/visualk", postLogin);

// router.post("/visualk");

// router.get("/visualk/count");

// router.get("/visualk/:id");

// router.delete("/visualk/:id");

// router.put("/visualk/:id");

export default router;
