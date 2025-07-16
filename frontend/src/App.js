import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage"; // ✅ NEW import
import { CartProvider } from "./components/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* ✅ NEW route */}
          <Route path="/menu/:category" element={<MenuPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
