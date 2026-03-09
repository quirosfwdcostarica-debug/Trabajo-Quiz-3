import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser || loggedUser.role !== 'cliente') {
      navigate('/login');
      return;
    }
    setUser(loggedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.avatar}>🥷</div>
        <h2 style={{color: '#ffb7c5', margin: '10px 0'}}>Perfil del Samurái</h2>
        <p style={{color: '#888', marginTop: '0'}}>Listado en los pergaminos</p>
        
        <div style={styles.info}>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Rango:</strong> {user.role.toUpperCase()}</p>
        </div>
        
        <div style={styles.actions}>
          <Link to="/tienda" style={styles.storeBtn}>Ir a la Armería</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>Desvincularse (Cerrar Sesión)</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', fontFamily: 'sans-serif' },
  profileCard: { backgroundColor: 'rgba(0,0,0,0.8)', padding: '3rem', borderRadius: '12px', border: '1px solid #444', textAlign: 'center', width: '350px', boxShadow: '0px 0px 20px rgba(255, 183, 197, 0.1)' },
  avatar: { fontSize: '5rem', marginBottom: '1rem' },
  info: { textAlign: 'left', backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', marginTop: '1.5rem', marginBottom: '2rem', borderLeft: '4px solid #8b0000' },
  actions: { display: 'flex', flexDirection: 'column', gap: '10px' },
  storeBtn: { padding: '12px', backgroundColor: '#4a4e69', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', width: '100%', boxSizing: 'border-box' },
  logoutBtn: { padding: '12px', backgroundColor: '#8b0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', width: '100%' }
};

export default ClientProfile;