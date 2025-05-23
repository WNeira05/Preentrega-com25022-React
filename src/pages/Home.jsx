import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from "../components/ProductList";
import loading from "../assets/loading.gif";
const Home = ({
  cart,
  productos,
  cargando,
  agregarCarrito,
  borrarProducto,
}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main>
        <h1>Tienda Online Anahi Lenceria Femenina</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptate illum molestias, voluptates dolorem rerum. Alias tempore ut
          nisi eum, harum natus velit veritatis ea iste illum facere, ipsam
          modi!
        </p>
        {cargando ? (
          <div
            className="loading-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <img src={loading} alt="loading" />
          </div>
        ) : (
          <ProductList agregarCarrito={agregarCarrito} productos={productos} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;
