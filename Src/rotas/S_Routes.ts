import { Router, Request, Response } from "express";
import { searchAll } from "../serviços/S_Services";

const router = Router();

//rota GET /search?q=algumTexto
router.get("/", (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({
      error: "Query parameter 'q' is required"
    });
  }

  try {
    const result = searchAll(query);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default router;