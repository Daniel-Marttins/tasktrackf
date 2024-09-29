import './App.css';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Landing } from './pages/Landing';
import { Login } from './pages/admin/Login';
import { Register } from './pages/admin/Register';
import { useAuth } from './contexts/AuthContext';
import { Home } from './pages/main/Home';
import { Dashboard } from './pages/main/Dashboard';
import { ToDo } from './pages/main/ToDo';
import { Configuration } from './pages/main/Configuration';

function App() {
  const { logado, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center" style={{ background: "#242323" }}>
      <Router>
        <Routes>
          <Route path="/" element={< Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={logado ? <Home /> : <Navigate to="/login" />}
          >
            <Route path="/home/dashboard" element={<Dashboard />} />
            <Route path="/home/to-do" element={<ToDo />} />
            <Route path="/home/settings" element={<Configuration />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
