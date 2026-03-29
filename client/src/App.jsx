import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomPackage from './pages/CustomPackage';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="packages" element={<Packages />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:slug" element={<CategoryDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="custom" element={<CustomPackage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />

            <Route path="checkout" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">Checkout - Próximamente</h1></div>} />

            <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">404 - Página no encontrada</h1></div>} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
