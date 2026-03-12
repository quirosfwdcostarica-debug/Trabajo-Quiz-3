const API_URL = 'http://localhost:3000';

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  const users = await response.json();
  return users.length > 0 ? users[0] : null;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const createProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
};