require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" })); // permitimos base64 grande

app.get("/", (req, res) => res.json({ message: "VegGO backend ok" }));

app.get("/empresas", async (req, res) => {
  const empresas = await db.selectEmpresas();
  res.json(empresas);
});

app.get("/empresas/:id", async (req, res) => {
  const empresa = await db.selectEmpresa(req.params.id);
  if (!empresa) return res.status(404).json({ error: "Empresa não encontrada" });
  res.json(empresa);
});

app.post("/empresas", async (req, res) => {
  const novo = await db.insertEmpresa(req.body);
  res.status(201).json(novo);
});

app.put("/empresas/:id", async (req, res) => {
  const updated = await db.updateEmpresa(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Empresa não encontrada" });
  res.json(updated);
});

app.delete("/empresas/:id", async (req, res) => {
  await db.deleteEmpresa(req.params.id);
  res.sendStatus(204);
});

(async () => {
  try {
    await db.init();
    app.listen(port, () => console.log(`Backend rodando na porta ${port}`));
  } catch (err) {
    console.error("Erro ao iniciar backend:", err);
    process.exit(1);
  }
})();
