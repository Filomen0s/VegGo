import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logotipo from './../Imagens/VeggoLogotipo.png';

function Navbar() {
  const location = useLocation();

  // normaliza o pathname (remove barra final exceto root) e lower-case
  const raw = location.pathname || '/';
  const noTrailing = raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw;
  const pathname = noTrailing.toLowerCase();

  // debug rápido (veja no console do navegador)
  console.log('Navbar -> location.pathname:', location.pathname, 'normalized:', pathname);

  const active = pathname === '/' ? 'home'
    : pathname === '/familiaveggo' ? 'familia'
      : null;

  const homeProps = {
    to: '/',
    style: { color: active === 'home' ? '#34FF00' : '#267B10' },
  };

  const familiaProps = {
    to: '/Familiaveggo', // mantenha o mesmo casing da sua rota se necessário
    style: { color: active === 'familia' ? '#34FF00' : '#267B10' },
  };

  return (
    <div className='navBar'>
      <div className='areaImagemNavBar'>
        <img className='logotipoNavbar' src={Logotipo} alt='Logotipo VegGo' />
      </div>

      <div className='areaIrPaginas'>
        <Link className='irPaginas' {...homeProps}>
          <h1 className='irHome'>Home</h1>
        </Link>

        <Link className='irPaginas' {...familiaProps}>
          <h1 className='irFamilia'>Família VegGo</h1>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
