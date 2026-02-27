import fs from "fs";
import path from "path";

type GenericObject = Record<string, unknown>;

/*
função que lê o JSON, monta o caminho
e transforma o conteúdo em objeto JavaScript
*/
function readJsonFile(filename: string): GenericObject[] {
  try {
    const filePath = path.join(__dirname, "..", "..", "data", filename);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Erro ao ler o arquivo ${filename}`);
  }
}

/*
função que recebe os arrays dos objetos e filtra
aqueles que têm o termo buscado
*/
function filterData(data: GenericObject[], searchTerm: string): GenericObject[] {
  return data.filter((item: GenericObject) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );
}

/*
função principal que executa a busca geral
*/
export function searchAll(query: string) {
  const searchTerm = query.toLowerCase();

  const equipments = filterData(readJsonFile("equipments.json"), searchTerm);
  const materials = filterData(readJsonFile("materials.json"), searchTerm);
  const purchaseOrders = filterData(readJsonFile("purchase_orders.json"), searchTerm);
  const salesOrders = filterData(readJsonFile("sales_orders.json"), searchTerm);
  const workforce = filterData(readJsonFile("workforce.json"), searchTerm);

  // normalização dos dados
  const normalizedResults = [
    ...equipments.map(item => ({
      type: "equipment",
      data: item
    })),
    ...materials.map(item => ({
      type: "material",
      data: item
    })),
    ...purchaseOrders.map(item => ({
      type: "purchaseOrder",
      data: item
    })),
    ...salesOrders.map(item => ({
      type: "salesOrder",
      data: item
    })),
    ...workforce.map(item => ({
      type: "workforce",
      data: item
    }))
  ];

  return {
    results: normalizedResults,
    total: normalizedResults.length
  };
}