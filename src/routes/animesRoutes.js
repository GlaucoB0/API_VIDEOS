import { Router } from "express";

import {
  getAnimes,
  postAnime,
  buscarAnime,
  editarAnime,
  deletarAnime,
} from "../controllers/animesController.js";

const router = Router();

router.get("/", getAnimes);
router.post("/", postAnime);
router.get("/:id", buscarAnime);
router.put("/:id", editarAnime);
router.delete("/:id", deletarAnime);

export default router;