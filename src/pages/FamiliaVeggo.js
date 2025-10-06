import React from 'react'
import ImagemMotoboyFV from './../Imagens/motoboyFV.png'
import MotoVeggo from './../Imagens/VeggoMoto.png'
import VeggoCozinheira from './../Imagens/VeggoCozinheira.png'
import { Link } from "react-router-dom"
import Navbar from './../Components/Navbar'

function FamiliaVeggo() {
    return (
        <div className='familiaVeggo'>
            <Navbar />
            <div className='areaCadastrar'>
                <img className='motoboyFV' src={ImagemMotoboyFV} alt='Motoboy dirigindo uma moto amarela'></img>

                <div className='cadastrarEmpresa'>
                    <h1>Cadastre seu restaurante</h1>
                    <p>Entre e ganhe um mês gratis</p>

                    <Link className='irPaginas' to='/Cadastro'>
                        <div className='botaoCadastro'>
                            <h1>Cadastrar agora</h1>
                        </div>
                    </Link>


                </div>
            </div>

            <div className='areaBeneficios'>

                <h1 className='tituloBeneficios'>Benefícios da VegGO</h1>

                <div className='areaBeneficioUm'>
                    <div className='efeitoVerdeAtrasDaImgUm'>
                        <img className='imagemBeneficioUm' src={VeggoCozinheira} alt=''></img>
                    </div>


                    <div className='areaTextoBeneficioUm'>
                        <h1>Aumente suas vendas com o plano Básico</h1>
                        <p>Você terá acesso a todas as ferramentas para começar a vender no VegGO, gerencie suas entregas diretamente e veja seu restaurante crescer. Ideal para quem quer começar a vender online e atrair mais clientes.</p>
                    </div>
                </div>


                <div className='areaBeneficioDois'>
                    <div className='areaTextoBeneficioDois'>
                        <h1>Potencialize suas entregas com Plano Entrega</h1>
                        <p>O Plano Entrega VegGO é a solução ideal para restaurantes que buscam otimizar suas entregas e conquistar mais clientes. Neste plano, você contará com entrega em tempo real, atendimento VegGO e seguro contra fraudes na entrega.</p>
                    </div>


                    <div className='efeitoVerdeAtrasDaImgDois'>
                        <img className='imagemBeneficioDois' src={MotoVeggo} alt=''></img>
                    </div>
                </div>

            </div>

            <div className='areaEmpresas'>
                <ul id='listaProdutos'></ul>
            </div>

        </div>
    )
}

export default FamiliaVeggo
