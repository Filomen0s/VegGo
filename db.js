require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  port: parseInt(process.env.DB_PORT || "5432"),
  password: process.env.PASSWORD,
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE
});

async function init() {
  // cria tabela se não existir
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS empresas (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        estrelas INTEGER DEFAULT 0,
        localizacao TEXT,
        descricao TEXT,
        logo TEXT, -- armazenaremos base64 dataURI
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
}

async function selectEmpresas() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM empresas ORDER BY id DESC");
    return res.rows;
  } finally {
    client.release();
  }
}

async function selectEmpresa(id) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM empresas WHERE id=$1", [id]);
    return res.rows[0];
  } finally {
    client.release();
  }
}

async function insertEmpresa(empresa) {
  const client = await pool.connect();
  try {
    const sql = `INSERT INTO empresas (nome, estrelas, localizacao, descricao, logo)
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [empresa.nome, empresa.estrelas, empresa.localizacao, empresa.descricao, empresa.logo];
    const res = await client.query(sql, values);
    return res.rows[0];
  } finally {
    client.release();
  }
}

async function updateEmpresa(id, empresa) {
  const client = await pool.connect();
  try {
    const sql = `UPDATE empresas SET nome=$1, estrelas=$2, localizacao=$3, descricao=$4, logo=$5 WHERE id=$6 RETURNING *`;
    const values = [empresa.nome, empresa.estrelas, empresa.localizacao, empresa.descricao, empresa.logo, id];
    const res = await client.query(sql, values);
    return res.rows[0];
  } finally {
    client.release();
  }
}

async function deleteEmpresa(id) {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM empresas WHERE id=$1", [id]);
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  init,
  selectEmpresas,
  selectEmpresa,
  insertEmpresa,
  updateEmpresa,
  deleteEmpresa
};
