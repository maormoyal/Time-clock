import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { post, error } = useApi();

  const handleRegister = async () => {
    try {
      await post('/users/register', { email, username, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className={styles.registerPage}>
      {error && <span className={styles.error}>{error}</span>}
      <input
        type='text'
        placeholder='User Name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>

      <p className={styles.registerPrompt}>
        Have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
