import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [isAuthenticated, setIsAuth] = useState(false);

    useEffect(() => {
        fetch('/data/data.json')
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    setProductos(data);
                    setCargando(false);
                }, 2000);
            })
            .catch(err => {
                console.error('Error al cargar los productos:', err);
                setCargando(false);
                setError(true);
            });
    }, []);

    const handleAddToCart = (productoNuevo) => {
        setCart(prevCart => {
            const productoExistente = prevCart.find(item => item.id === productoNuevo.id);
            const productoCatalogo = productos.find(p => p.id === productoNuevo.id);
            const stockDisponible = productoCatalogo ? productoCatalogo.stock : 0;

            const cantidadEnCarrito = productoExistente ? productoExistente.cantidad : 0;
            const cantidadTotal = cantidadEnCarrito + productoNuevo.cantidad;

            if (cantidadTotal > stockDisponible) {
                Swal.fire({
                    title: "Stock insuficiente",
                    text: `Solo hay ${stockDisponible} unidades disponibles de este producto.`,
                    icon: "warning",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#f27474",
                });
                return prevCart;
            }

            if (productoExistente) {
                return prevCart.map(item =>
                    item.id === productoNuevo.id
                        ? { ...item, cantidad: item.cantidad + productoNuevo.cantidad }
                        : item
                );
            } else {
                return [...prevCart, { ...productoNuevo }];
            }
        });
    };

    const handleDeleteFromCart = (producto) => {
        setCart(prevCart =>
            prevCart
                .map(item => {
                    if (item.id === producto.id) {
                        if (item.cantidad > 1) {
                            return { ...item, cantidad: item.cantidad - 1 };
                        } else {
                            return null;
                        }
                    }
                    return item;
                })
                .filter(item => item !== null)
        );
    };

    const handleIncreaseQuantity = (producto) => {
        const productoCatalogo = productos.find(p => p.id === producto.id);
        const stockDisponible = productoCatalogo ? productoCatalogo.stock : 0;

        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === producto.id) {
                    if (item.cantidad < stockDisponible) {
                        return { ...item, cantidad: item.cantidad + 1 };
                    } else {
                        Swal.fire({
                            title: "Stock insuficiente",
                            text: `No se puede agregar más de ${stockDisponible} unidades.`,
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#f27474",
                        });
                    }
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const confirmarCompra = () => {
        const nuevosProductos = productos.map(prod => {
            const itemEnCarrito = cart.find(item => item.id === prod.id);
            if (itemEnCarrito) {
                const nuevoStock = prod.stock - itemEnCarrito.cantidad;
                return { ...prod, stock: nuevoStock >= 0 ? nuevoStock : 0 };
            }
            return prod;
        });

        setProductos(nuevosProductos);
        clearCart();

        Swal.fire({
            title: '¡Compra realizada!',
            text: 'Gracias por tu compra.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            productos,
            cargando,
            error,
            handleAddToCart,
            handleDeleteFromCart,
            handleIncreaseQuantity,
            clearCart,
            confirmarCompra,
            isAuthenticated
        }}>
            {children}
        </CartContext.Provider>
    );
};
