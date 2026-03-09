import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../Services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'cliente' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(formData);
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2>Forjar Nueva Alianza</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" type="text" placeholder="Nombre" required onChange={handleChange} style={styles.input} />
        <input name="email" type="email" placeholder="Correo" required onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Contraseña" required onChange={handleChange} style={styles.input} />
        <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
          <option value="cliente">Cliente (Samurái)</option>
          <option value="admin">Administrador (Shogun)</option>
        </select>
        <button type="submit" style={styles.btn}>Registrarse</button>
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

export default Register;