import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styleEstatico.css';
import Cart from '../Cart';
import { AuthContext } from '../../context/AuthContext';  

const Header = ({ cartItems, borrarProducto }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/' className='link'>Inicio</Link></li>
          <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
          <li><Link to='/productos' className='link'>Galeria de productos</Link></li>
          <li><Link to='/contacto' className='link'>Contacto</Link></li>

          {isAuthenticated && (
            <li><Link to='/admin' className='link'>Admin</Link></li>
          )}

          {!isAuthenticated ? (
            <li><Link to='/login' className='link'>Login</Link></li>
          ) : (
            <li>
              <button 
                className='btnLogout' 
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: 0,
                  marginLeft: '1rem'
                }}
              >
                Logout
              </button>
            </li>
          )}

          <li className='cartnav'>
            <button className='btnCart' onClick={() => setCartOpen(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <Cart 
              borrarProducto={borrarProducto} 
              cartItems={cartItems} 
              isOpen={isCartOpen} 
              onClose={() => setCartOpen(false)} 
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
