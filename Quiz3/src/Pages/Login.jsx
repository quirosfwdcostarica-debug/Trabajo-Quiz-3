import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../Services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(email, password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
    } else {
      setError('Credenciales incorrectas. El honor exige la verdad.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Ingresar al Dojo</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" placeholder="Correo de guerrero" required onChange={e => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Contraseña secreta" required onChange={e => setPassword(e.target.value)} style={styles.input} />
        {error && <p style={{color: '#ffb7c5'}}>{error}</p>}
        <button type="submit" style={styles.btn}>Desenvainar</button>
      </form>
      <Link to="/" style={styles.link}>Volver al inicio</Link>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', color: 'white', paddingTop: '10vh', fontFamily: 'sans-serif' },
  form: { display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '15px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '2rem', borderRadius: '8px', border: '1px solid #333' },
  input: { padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#222', color: 'white' },
  btn: { padding: '12px', backgroundColor: '#8b0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' },
  link: { color: '#aaa', marginTop: '1.5rem', display: 'block', textDecoration: 'none' }
};

export default Login;