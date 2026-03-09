import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⛩️ El Dojo del Acero ⛩️</h1>
      <p style={styles.subtitle}>Supermercado de Katanas y Reliquias Japonesas</p>
      
      <div style={styles.iconContainer}>
        <span style={{ fontSize: '4rem' }}>🪴 🗡️</span>
      </div>

      <nav style={styles.nav}>
        <Link to="/login" style={styles.btn}>Iniciar Sesión</Link>
        <Link to="/register" style={styles.btn}>Registrarse</Link>
      </nav>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', color: '#fff', paddingTop: '15vh', fontFamily: 'sans-serif' },
  title: { fontSize: '3rem', margin: '0', color: '#ffb7c5', textShadow: '2px 2px 4px #000' },
  subtitle: { fontSize: '1.2rem', color: '#ccc' },
  iconContainer: { margin: '2rem 0' },
  nav: { display: 'flex', justifyContent: 'center', gap: '20px' },
  btn: { padding: '12px 24px', backgroundColor: '#8b0000', color: 'white', textDecoration: 'none', borderRadius: '4px', border: '1px solid #ffb7c5', fontWeight: 'bold', transition: '0.3s' }
};

export default Home;