import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import ProfileForm from './forms/ProfileForm';
import Dashboard from './pages/Dashboard'

const RouterConfig = ({ login, register }) => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/register" element={<RegisterForm signup={register}/>} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default RouterConfig;
