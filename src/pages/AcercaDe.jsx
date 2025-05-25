import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";

const AcercaDe = ({ cart, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <h1>Conocenos ❤</h1>
      <p>
        Somos ANAHI LENCERIA FEMENINA, una marca inspirada en el diseño de
        prendas únicas y exclusivas. Nos destacamos por la calidad y el mejor
        precio. Confeccionamos todas nuestras prendas en 10 talles. Nuestros
        precios mayoristas están pensados para que al revender puedas obtener
        una ganancia de más del 100%. Trabajamos con materia prima de primera
        calidad, y todos nuestros conjuntos vienen empaquetados de manera
        individual, con su respectivo talle en cada prenda, a su vez en el
        paquete llevan una etiqueta con el nombre y talle de dicha prenda. Todo
        se entrega planchado y perfumado , YA LISTO PARA QUE PUEDAN ENTREGAR!!♡
        .
      </p>
      <Footer />
    </>
  );
};

export default AcercaDe;
