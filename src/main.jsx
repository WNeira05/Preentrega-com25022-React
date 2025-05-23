import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // ✅ Importar el AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>           {/* ✅ Envolver primero */}
      <CartProvider>         {/* ✅ Luego el carrito */}
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
