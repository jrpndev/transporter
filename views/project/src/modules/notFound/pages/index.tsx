import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        color: '#333',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: 'bold',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: '1.5rem',
          margin: '1rem 0',
        }}
      >
        Página não encontrada
      </p>
      <Link
        to="/"
        style={{
          fontSize: '1.2rem',
          color: '#007bff',
          textDecoration: 'none',
        }}
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
