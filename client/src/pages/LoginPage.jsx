import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setError(error.response.data);
    }
  };

  return (
    <div className={styles.loginPage}>
      <span className={styles.error}>{error}</span>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p className={styles.registerPrompt}>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
