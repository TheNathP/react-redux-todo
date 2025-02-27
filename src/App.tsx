import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import WishList from "./components/WishList";
import { RootState } from "./store/store";

const App = () => {
  const cartItems = useSelector((state:RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
      <Router>
        <div className="w-full mx-auto">
          <nav className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4">
            <div className="w-5/6 mx-auto flex justify-between gap-8 font-mainFont">
              <Link 
                className="text-xl font-semibold hover:text-gray-400 transition-all duration-300" 
                to="/"
              >
                Accueil
              </Link>
              <div className="flex items-center gap-8">
                <Link 
                  className="text-xl font-semibold hover:text-gray-400 transition-all duration-300 flex items-center" 
                  to="/cart"
                >
                  Panier {cartCount > 0 && <span className="ml-2 bg-red-500 text-white px-2 rounded-full text-sm">{cartCount}</span>}
                </Link>
                <Link 
                  className="text-xl font-semibold hover:text-gray-400 transition-all duration-300" 
                  to="/wishlist"
                >
                  Favoris
                </Link>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
          </Routes>

          <footer className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-8 mt-12">
            <div className="w-3/4 mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left font-sndFont">
              <div className="w-1/2 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-4 font-mainFont">À propos</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Découvrez nos produits de qualité et profitez des meilleures offres. Votre satisfaction est notre priorité.
                </p>
              </div>

              <div className="w-1/2 mb-6 md:mb-0 flex justify-end gap-10">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-4 font-mainFont">Liens rapides</h3>
                  <ul className="space-y-2">
                    <li><Link to="/" className="hover:text-gray-400 transition-all duration-300">Accueil</Link></li>
                    <li><Link to="/cart" className="hover:text-gray-400 transition-all duration-300">Panier</Link></li>
                    <li><Link to="/wishlist" className="hover:text-gray-400 transition-all duration-300">Favoris</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 font-mainFont">Contactez-nous</h3>
                  <p className="text-sm text-gray-400">Email : support@exemple.com</p>
                  <p className="text-sm text-gray-400">Téléphone : +33 1 23 45 67 89</p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Facebook</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">X</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-all duration-300">Instagram</a>
                  </div>
                </div>
              </div>

            </div>

            <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
              © {new Date().getFullYear()} Nathan Pietrzak. Tous droits réservés.
            </div>
          </footer>

        </div>
      </Router>
  );
};

export default App;
