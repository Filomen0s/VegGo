// src/pages/FamiliaVeggo.jsx
import React, { useEffect, useState } from "react";
import ImagemMotoboyFV from "../Imagens/motoboyFV.png";
import MotoVeggo from "../Imagens/VeggoMoto.png";
import VeggoCozinheira from "../Imagens/VeggoCozinheira.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { fetchEmpresas, deleteEmpresa } from "../api";


function FamiliaVeggo() {
    const [empresas, setEmpresas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const data = await fetchEmpresas();
            setEmpresas(data || []);
        } catch (err) {
            console.error("Erro carregando empresas:", err);
            alert("Erro ao buscar empresas: " + err.message);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Confirma exclusão?")) return;
        try {
            await deleteEmpresa(id);
            load();
        } catch (err) {
            console.error("Erro ao deletar:", err);
            alert("Erro ao deletar empresa: " + err.message);
        }
    }

    return (
        <div className="familiaVeggo">
            <Navbar />
            <div className="areaCadastrar" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
                <img className="motoboyFV" src={ImagemMotoboyFV} alt="Motoboy dirigindo uma moto amarela" style={{ width: "40%", marginTop: "10%", marginBottom: "10%" }} />

                <div className="cadastrarEmpresa" style={{ width: "34%", backgroundColor: "#fff", borderRadius: 25, padding: "1%" }}>
                    <h1 style={{ fontSize: "250%", margin: 0 }}>Cadastre seu restaurante</h1>
                    <p style={{ marginTop: 6, color: "#795353", fontWeight: "bold" }}>Entre e ganhe um mês grátis</p>

                    <Link className="irPaginas" to="/Cadastro">
                        <div className="botaoCadastro" style={{ backgroundColor: "#FD1B1B", color: "#fff", borderRadius: 9, width: "75%", margin: "auto", marginTop: "10%", textAlign: "center", padding: 12, cursor: "pointer" }}>
                            <h1 style={{ fontSize: "150%", margin: 0 }}>Cadastrar agora</h1>
                        </div>
                    </Link>
                </div>
            </div>

            {/* --- BENEFÍCIOS (reinsirido) --- */}
            <div className="areaBeneficios" style={{ backgroundColor: "#fff", padding: "40px 5%" }}>
                <h1 className="tituloBeneficios" style={{ textAlign: "center", fontSize: "3rem", color: "#585858", marginBottom: 24 }}>Benefícios da VegGO</h1>

                <div className="areaBeneficioUm" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 28 }}>
                    <div className="efeitoVerdeAtrasDaImgUm" style={{ backgroundColor: "#7AA81A", width: "48%", minHeight: 300, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img className="imagemBeneficioUm" src={VeggoCozinheira} alt="" style={{ width: "85%", borderRadius: 16 }} />
                    </div>

                    <div className="areaTextoBeneficioUm" style={{ width: "44%" }}>
                        <h2 style={{ color: "#585858", fontSize: "1.8rem", textAlign: "left", marginBottom: 12 }}>Aumente suas vendas com o plano Básico</h2>
                        <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.5 }}>
                            Você terá acesso a todas as ferramentas para começar a vender no VegGO, gerencie suas entregas diretamente e veja seu restaurante crescer.
                            Ideal para quem quer começar a vender online e atrair mais clientes.
                        </p>
                    </div>
                </div>

                <div className="areaBeneficioDois" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
                    <div className="areaTextoBeneficioDois" style={{ width: "44%" }}>
                        <h2 style={{ color: "#585858", fontSize: "1.8rem", textAlign: "left", marginBottom: 12 }}>Potencialize suas entregas com Plano Entrega</h2>
                        <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.5 }}>
                            O Plano Entrega VegGO é a solução ideal para restaurantes que buscam otimizar suas entregas e conquistar mais clientes.
                            Neste plano, você contará com entrega em tempo real, atendimento VegGO e seguro contra fraudes na entrega.
                        </p>
                    </div>

                    <div className="efeitoVerdeAtrasDaImgDois" style={{ backgroundColor: "#7AA81A", width: "48%", minHeight: 300, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img className="imagemBeneficioDois" src={MotoVeggo} alt="" style={{ width: "85%", borderRadius: 16 }} />
                    </div>
                </div>
            </div>
            {/* --- FIM BENEFÍCIOS --- */}

            {/* --- ÁREA DE EMPRESAS (lista com edição/apagar) --- */}
            <div className="areaEmpresas" style={{ padding: "40px" }}>
                <h1 className="tituloRestaurantes" style={{ color: "#fff", marginBottom: 20, textAlign: "center" }}>Restaurantes</h1>

                <div className="listaEmpresas" style={{ maxWidth: 1100, margin: "auto" }}>
                    {empresas.length === 0 ? (
                        <div style={{ padding: 20, background: "#ffffff66", borderRadius: 12, textAlign: "center" }}>
                            Nenhuma empresa cadastrada ainda.
                        </div>
                    ) : (
                        empresas.map(emp => (
                            <div key={emp.id} className="cardEmpresa" style={{
                                display: "flex",
                                justifyContent: "space-between",
                                background: "#ffffffaa",
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 12,
                                alignItems: "center"
                            }}>
                                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", width: "70%" }}>
                                    <div style={{
                                        width: 120, height: 120, background: "#cfcfcf",
                                        display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8,
                                        overflow: "hidden"
                                    }}>
                                        {emp.logo ? <img src={emp.logo} alt={emp.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div>Sem imagem</div>}
                                    </div>

                                    <div style={{ display: "block" }}>
                                        <div style={{ fontWeight: 700, fontSize: 18 }}>{emp.nome}</div>
                                        <div style={{ marginTop: 6 }}>{emp.estrelas} estrelas</div>
                                        <div style={{ marginTop: 6 }}>{emp.localizacao}</div>
                                        <div style={{ marginTop: 8, maxWidth: 500 }}>{emp.descricao}</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <button onClick={() => navigate(`/Cadastro?id=${emp.id}`)} style={{ padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}>Editar</button>
                                    <button onClick={() => handleDelete(emp.id)} style={{ padding: "10px 16px", borderRadius: 8, background: "#ff6b6b", color: "#fff", border: "none", cursor: "pointer" }}>Apagar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default FamiliaVeggo;
