import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function search(query: string) {
  const response = await api.get("/search", {
    params: { q: query },
  });

  return response.data;
}