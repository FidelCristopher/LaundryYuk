// src/Login.jsx

import React, { useState } from 'react';
import axios from 'axios'; 
const API_URL = "http://localhost/LaundryYuk/login.php"; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!username || !password) {
        setMessage('Mohon isi semua field.');
        setIsLoading(false);
        return;
    }

    try {
      const response = await axios.post(API_URL, {
        username: username,
        password: password
      });

      if (response.data.success) {
        const userRole = response.data.user.role;
        setMessage(`Login Berhasil! Selamat datang ${username} (${userRole}).`);
        console.log("Data user:", response.data.user);

      } else {
        setMessage(response.data.message || 'Login gagal. Silakan coba lagi.');
      }

    } catch (error) {
      console.error("Gagal terhubung ke API:", error);
      setMessage("Gagal terhubung ke server (API Error). Pastikan XAMPP running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc' }}>
      <h2>Halaman Login Laundry Yuk</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Username:</label>
          <input 
            id="username"
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            disabled={isLoading}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Password:</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={isLoading}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ padding: '10px 20px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>

      {message && 
        <p style={{ 
            color: message.includes('Berhasil') ? 'green' : 'red', 
            marginTop: '15px' 
        }}>
          {message}
        </p>
      }
    </div>
  );
}

export default Login;