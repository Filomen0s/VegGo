import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Saida from "../Imagens/imagemCasa.png";
import { createEmpresa, fetchEmpresa, updateEmpresa } from "../api";

function Cadastro() {
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    estrelas: 0,
    localizacao: "",
    descricao: "",
    logo: null // dataURL
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchEmpresa(id).then(emp => {
        if (emp) {
          setForm({
            nome: emp.nome || "",
            estrelas: emp.estrelas || 0,
            localizacao: emp.localizacao || "",
            descricao: emp.descricao || "",
            logo: emp.logo || null
          });
          setPreview(emp.logo || null);
        }
      });
    }
  }, [id]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "estrelas" ? Number(value) : value }));
  }

  function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, logo: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (isEditing && id) {
        await updateEmpresa(id, form);
        alert("Empresa atualizada!");
      } else {
        await createEmpresa(form);
        alert("Empresa cadastrada!");
      }
      navigate("/FamiliaVeggo");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar. Veja console.");
    }
  }

  return (
    <div className="cadastro">
      <Link to="/FamiliaVeggo">
        <img className="saidaCadastro" src={Saida} alt="voltar" />
      </Link>

      <h1>{isEditing ? "Editar empresa" : "Cadastre sua empresa"}</h1>

      <form className="areaInputs" onSubmit={onSubmit}>
        <div className="areaInputUm">
          <input type="text" id="nome" name="nome" placeholder="Nome do restaurante" value={form.nome} onChange={onChange} required />
          <input type="number" id="estrelas" name="estrelas" placeholder="Estrelas" max={5} min={0} value={form.estrelas} onChange={onChange} />
          <input type="text" id="localizacao" name="localizacao" placeholder="Localização" value={form.localizacao} onChange={onChange} />
          <textarea id="descricao" name="descricao" placeholder="Descrição" value={form.descricao} onChange={onChange} rows={4} />
          <button type="submit">{isEditing ? "Editar" : "Cadastrar"}</button>
        </div>

        <div className="areaInputDois">
          <div className="divImagem">
            {preview ? <img id="imagemArquivo" src={preview} alt="imagemLogo" /> : <div style={{ padding: 20 }}>Sem imagem</div>}
          </div>

          <input type="file" id="imgInp" accept=".jpg, .png, image/*" onChange={onFileChange} />
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
