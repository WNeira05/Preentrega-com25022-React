import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetallesProductos = ({ productos }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productos.find(producto => producto.id == id);

  return (
    <div>
      <h1>Detalle del producto</h1>
      {product ? (
        <>
          {/* <h2>{product.detalle || "Sin descripción disponible"}</h2> */}
          <p><strong>Nombre:</strong> {product.nombre}</p>
          <p><strong>Precio:</strong> ${product.precio}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <img src={product.imagen} alt={product.nombre} style={{ width: '200px' }} />
        </>
      ) : (
        <p>Producto no encontrado</p>
      )}

      <br />
      <button className="boton-volver" onClick={() => navigate('/productos')} style={{ marginTop: '20px' }}>
        Volver a la galería de productos
      </button>
    </div>
  );
};

export default DetallesProductos;

