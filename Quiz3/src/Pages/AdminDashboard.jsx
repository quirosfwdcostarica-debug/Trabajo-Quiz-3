import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct, updateProduct, createProduct } from '../Services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  // Añadimos imageUrl al estado inicial
  const [formData, setFormData] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      await createProduct(formData);
    }
    // Limpiamos el formulario incluyendo la imagen
    setFormData({ name: '', price: '', description: '', imageUrl: '' });
    loadProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{color: '#ffb7c5'}}>⚙️ Arsenal del Shogun</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>Cerrar Sesión</button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del arma" required style={styles.input} />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Precio en Yenes" required style={styles.input} />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Descripción de la reliquia" required style={styles.input} />
        {/* Nuevo input para la imagen */}
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL de la imagen (http://...)" required style={styles.input} />
        <button type="submit" style={styles.btn}>{editingId ? 'Forjar Modificación' : 'Añadir Nueva Arma'}</button>
      </form>

      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            {/* Etiqueta de imagen añadida aquí */}
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} style={styles.image} />}
            <h3>{p.name}</h3>
            <p style={{color: '#ffb7c5', fontWeight: 'bold'}}>¥{p.price}</p>
            <p style={{fontSize: '0.9rem', color: '#ccc'}}>{p.description}</p>
            <div style={styles.actions}>
              <button onClick={() => handleEdit(p)} style={styles.editBtn}>Modificar</button>
              <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>Destruir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', color: 'white', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #ffb7c5', paddingBottom: '1rem' },
  form: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '2rem', backgroundColor: 'rgba(0,0,0,0.6)', padding: '1.5rem', borderRadius: '8px' },
  input: { padding: '10px', flex: '1 1 45%', backgroundColor: '#222', color: 'white', border: '1px solid #444', borderRadius: '4px' },
  btn: { padding: '10px 20px', flex: '1 1 100%', backgroundColor: '#8b0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', marginTop: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'rgba(20, 20, 20, 0.8)', padding: '1.5rem', borderRadius: '8px', border: '1px solid #444', display: 'flex', flexDirection: 'column' },
  image: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #333', marginBottom: '10px' },
  actions: { display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '1rem' },
  editBtn: { padding: '8px', flex: 1, backgroundColor: '#4a4e69', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
  deleteBtn: { padding: '8px', flex: 1, backgroundColor: '#c1121f', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#333', color: 'white', border: '1px solid #ffb7c5', cursor: 'pointer', borderRadius: '4px' }
};

export default AdminDashboard;