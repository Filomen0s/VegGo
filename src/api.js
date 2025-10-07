// src/api.js
const BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

async function request(path, opts = {}) {
  const url = `${BASE}${path}`;
  console.log("[API] request ->", url);
  const res = await fetch(url, opts);

  // Log de diagnóstico
  console.log("[API] status:", res.status, "content-type:", res.headers.get("content-type"));

  // tenta ler texto se não for JSON - para ajudar debug
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  if (contentType.includes("application/json")) {
    return res.json();
  } else {
    const text = await res.text();
    // Retorna erro claro para não quebrar com JSON.parse
    throw new Error(`Resposta não é JSON (content-type: ${contentType}). Conteúdo: ${text.slice(0,500)}`);
  }
}

export async function fetchEmpresas() {
  return request("/empresas");
}

export async function fetchEmpresa(id) {
  return request(`/empresas/${id}`);
}

export async function createEmpresa(data) {
  return request("/empresas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function updateEmpresa(id, data) {
  return request(`/empresas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function deleteEmpresa(id) {
  return request(`/empresas/${id}`, { method: "DELETE" });
}
