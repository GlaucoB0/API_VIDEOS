import { Router } from "express";

import {
  getEpisodios,
  postEpisodio,
  buscarEpisodio,
  editarEpisodio,
  deletarEpisodio,
} from "../controllers/episodiosController.js";

const router = Router();

router.get("/", getEpisodios);
router.post("/", postEpisodio);
router.get("/:id", buscarEpisodio);
router.put("/:id", editarEpisodio);
router.delete("/:id", deletarEpisodio);

export default router;