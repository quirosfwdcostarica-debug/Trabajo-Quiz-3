import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts } from '../Services/api';

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Validamos que sea un cliente
    if (!user || user.role !== 'cliente') {
      navigate('/login');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{color: '#ffb7c5'}}>🎌 Galería de Armas</h2>
        <Link to="/perfil" style={styles.backBtn}>Volver al Perfil</Link>
      </div>

      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} style={styles.image} />}
            <h3>{p.name}</h3>
            <p style={{color: '#ffb7c5', fontWeight: 'bold', fontSize: '1.2rem'}}>¥{p.price}</p>
            <p style={{fontSize: '0.9rem', color: '#ccc'}}>{p.description}</p>
            <button style={styles.buyBtn}>Añadir al Carrito (Próximamente)</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', color: 'white', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #ffb7c5', paddingBottom: '1rem' },
  backBtn: { padding: '8px 16px', backgroundColor: '#333', color: 'white', textDecoration: 'none', border: '1px solid #ffb7c5', borderRadius: '4px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'rgba(20, 20, 20, 0.8)', padding: '1.5rem', borderRadius: '8px', border: '1px solid #444', display: 'flex', flexDirection: 'column' },
  image: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #333', marginBottom: '10px' },
  buyBtn: { padding: '10px', marginTop: 'auto', backgroundColor: '#8b0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }
};

export default Tienda;