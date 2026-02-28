export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Search API",
    version: "1.0.0",
    description: "API para busca de dados nas tabelas do sistema"
  },
  
  paths: {
    "/search": {
      get: {
        summary: "Buscar registros",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Retorna os resultados encontrados"
          },
          "400": {
            description: "Parâmetro 'q' não informado"
          },
          "500": {
            description: "Erro interno do servidor"
          }
        }
      }
    }
  }
};