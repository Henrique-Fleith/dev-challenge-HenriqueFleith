import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import searchRoutes from "./rotas/S_Routes";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";

const app = express(); 
const PORT: number = 3000;

app.use(cors());
app.use(express.json());

// rotas
app.use("/search", searchRoutes);

// swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);

  res.status(500).json({
    error: "Internal server error"
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});