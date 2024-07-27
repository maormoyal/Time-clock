import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header/Header';
import { AuthProvider, useAuth } from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route
          path='/login'
          element={
            <AuthRoute isPublic>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path='/register'
          element={
            <AuthRoute isPublic>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <AuthRoute>
              <DashboardPage />
            </AuthRoute>
          }
        />
        <Route path='/' element={<Navigate to='/dashboard' />} />
      </Routes>
    </Router>
  </AuthProvider>
);

const AuthRoute = ({ children, isPublic }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isPublic) {
    return user ? <Navigate to='/dashboard' /> : children;
  }

  return user ? children : <Navigate to='/login' />;
};

export default App;
