import React from 'react';

import logo from '../assets/facebook.png';
import { MdAccountCircle } from 'react-icons/md';

function Header() {
  return (
    <nav className="container">
      <img src={logo} alt="logomarca" />

      <ul>
        <li>
          Meu perfil <MdAccountCircle style={{ padding: '0 10px' }} />
        </li>
      </ul>
    </nav>
  );
}

export default Header;
