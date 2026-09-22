import React, { useState, useEffect } from 'react';
import './Tienda.css';

export const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
          throw new Error('Error al consultar la API');
        }
        const datos = await respuesta.json();
        setProductos(datos);
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        Ocurrió un error: {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary fw-bold">Tienda ULibre - Productos</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {productos.map((producto) => (
          <div className="col" key={producto.id}>
            <div className="card h-100 shadow-sm custom-card">
              <div className="img-container p-3 text-center">
                <img
                  src={producto.image}
                  className="card-img-top img-fluid"
                  alt={producto.title}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" title={producto.title}>
                  {producto.title}
                </h5>
                <p className="card-text text-muted flex-grow-1 text-description">
                  {producto.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold fs-5 text-success">
                    ${producto.price.toFixed(2)}
                  </span>
                  <button className="btn btn-outline-primary btn-sm">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tienda;