const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

//requisições da api
app.use(cors());

app.use(express.json());

//função que lê o JSON, monta o caminho e transforma o conteúdo em objeto JavaScript

function readJsonFile(filename) {
  const filePath = path.join(__dirname, "..", "data", filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}


//busca o parâmetro de query no formato GET /search?q=algumTexto

app.get("/search", (req, res) => {
  const query = req.query.q;

  //se não vier nada ele já retorna o erro 400
  if (!query) {
    return res.status(400).json({
      error: "Query parameter 'q' is required"
    });
  }

  // Tira o case sensitive
  const searchTerm = query.toLowerCase();

  const equipments = readJsonFile("equipments.json");
  const materials = readJsonFile("materials.json");
  const purchaseOrders = readJsonFile("purchase_orders.json");
  const salesOrders = readJsonFile("sales_orders.json");
  const workforce = readJsonFile("workforce.json");

  //Função que recebe os array dos objetos e filtra aqueles que tem o termo buscado e dps Converte tudo para string.
  
  function filterData(data) {
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
  }

  // Organiza o resultado por tipo
  const result = {
    equipments: filterData(equipments),
    materials: filterData(materials),
    purchaseOrders: filterData(purchaseOrders),
    salesOrders: filterData(salesOrders),
    workforce: filterData(workforce)
  };

  // Retorna os dados encontrados
  res.json(result);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});