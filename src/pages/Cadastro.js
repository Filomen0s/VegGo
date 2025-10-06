import React, { useState } from 'react'
import Saida from './../Imagens/imagemCasa.png'
import { Link } from "react-router-dom";

function Cadastro() {

  const [link, setPreview] = useState(null);

  const mostrarArquivo = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }

  };






  
  return (
    <div className='cadastro'>


      <Link to='/Familiaveggo'>
        <img className='saidaCadastro' src={Saida} />
      </Link>

      <h1>Cadastre sua empresa</h1>

      <div className='areaInputs'>
        <div className='areaInputUm'>
          <input type='text' id='nome' name='nome' placeholder='Nome do restaurante' />
          <input type='number' id='estrelas' name='estrelas' placeholder='Estrelas' max={5} min={0} />
          <input type='text' id='localizacao' name='localizacao' placeholder='Localização' />
          <input type='text' id='descricao' name='descricao' placeholder='Descrição' />

          <button>Cadastrar</button>
        </div>

        <div className='areaInputDois'>
          <div className='divImagem'>
            <img id="imagemArquivo" src={link} alt='imagemLogo' />
          </div>

          <input type='file' id="imgInp" accept=".jpg, .png, image/*" onChange={mostrarArquivo} />
        </div>
      </div>
    </div>
  )
}

export default Cadastro
