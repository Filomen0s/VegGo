import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { fetchEmpresas } from "../api";
import ImagemLogotipo from "../Imagens/VeggoLogotipo.png"
import ImagemPrato from "../Imagens/VeggoPrato.png"
import ImagemOutdoor from "../Imagens/VeggoOutdoor.png"
import ImagemBurguer from "../Imagens/VeggoBurguer.png"
import ImagemQueijo from "../Imagens/VeggoQueijo.png"

function Home() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    fetchEmpresas().then(list => setEmpresas(list.slice(0, 3))); // já vem ordenado por id desc
  }, []);

  return (
    <div className="tudo">
      <Navbar />
      <div className='entrada'>

        <div className='areaTextoEntrada'>
          <img className='tituloVeggo' src={ImagemLogotipo} alt=''></img>

          <p className='slogan'>Vai de VegGo que não tem erro!</p>
        </div>

        <img className='imagemPrato' src={ImagemPrato} alt='Prato vegano'></img>
      </div>



      <div className='areaSobreNos'>
        <img className='imagemOutdor' src={ImagemOutdoor} alt='Outdoor VegGo'></img>

        <div className='AreaTextoSobreNos'>
          <h1 className='tituloSobreNos'>Sobre nós</h1>

          <p className='textoSobreNos'>A VegGO é a plataforma ideal para quem busca comida vegana com praticidade e sabor. Reunimos diversos restaurantes especializados, oferecendo pratos frescos e nutritivos na sua porta. Nosso objetivo é conectar amantes da culinária vegana aos melhores estabelecimentos. Vem fazer parte da família VegGO.</p>
        </div>

      </div>

      <div className='areaExDeProdutos'>

        <div className='produto1'>
          <img className='imgBurguer' src={ImagemBurguer} alt='Hamburguer vegano'></img>

          <div className='areaTextoProduto1'>
            <h1 className='tituloProduto1'>Hamburguer vegano</h1>

            <p>Um hambúrguer vegano suculento, feito com grãos selecionados, legumes frescos e temperos naturais. Textura macia por dentro e levemente crocante por fora, oferecendo sabor rico e 100% livre de ingredientes de origem animal.</p>
          </div>

        </div>

        <div className='produto2'>
          <img className='imgQueijo' src={ImagemQueijo} alt='Palito de queijo vegano'></img>

          <div className='areaTextoProduto2'>
            <h1 className='tituloProduto2'>Palitos de queijo vegano</h1>

            <p>Palitos crocantes por fora e macios por dentro, recheados com delicioso queijo vegano derretido. Sabor irresistível e totalmente livre de ingredientes de origem animal.</p>
          </div>
        </div>
      </div>

      <div className="areaRestaurantes">
        <h1 className="tituloRestaurantes">Restaurantes</h1>
        <div className="separarRestaurantes">
          {[0, 1, 2].map(i => {
            const emp = empresas[i];
            return (
              <div key={i} className="restauranteUm" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {emp && emp.logo ? <img src={emp.logo} alt={emp.nome} style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain", borderRadius: 12 }} /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;