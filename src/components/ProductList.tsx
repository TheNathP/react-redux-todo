import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState } from "react";
import { fetchProducts, setPage } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { toggleWishlistItem } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { items, isLoading, currentPage } = useSelector(
    (state: RootState) => state.products
  );

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    dispatch(fetchProducts(currentPage || 1));
  }, [dispatch, currentPage]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500 animate-pulse">Chargement...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <h1 className="text-9xl font-bold text-black mb-8 font-mainFont">
        Nos Produits
      </h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 text-lg font-sndFont w-1/2"
        />
      </div>

      {isHovering && !isHoveringButton && (
        <div
          className="fixed px-2 bg-white text-black text-lg font-regular font-sndFont pointer-events-none z-20"
          style={{
            left: cursorPos.x,
            top: cursorPos.y - 15,
            transform: "translate(-50%, -50%)",
          }}
        >
          Voir produit
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-neutral-100 h-[75vh] flex flex-col justify-between relative overflow-hidden"
          >
            <div
              className="bg-gradient-to-r from-black to-gray-800 p-4 w-full h-full opacity-0 hover:opacity-100 flex flex-col 
              justify-between absolute transition-all duration-300 z-10 cursor-none"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              <Link
                to={`/products/${product.id}`}
                className="product-link flex flex-col justify-between h-full relative cursor-none"
              >
                <h3 className="text-white font-mainFont text-6xl">
                  {product.title}
                </h3>
                <div className="flex justify-between items-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addToCart(product));
                    }}
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)}
                    className="w-5/6 text-center bg-neutral-100 font-sndFont text-black 
                    text-lg font-regular border border-white py-2 hover:bg-transparent
                    hover:text-white hover:border-white transition-all duration-300"
                  >
                    Ajouter au panier
                  </button>
                  <button 
                    onClick={(e) =>{
                      e.preventDefault();
                      dispatch(toggleWishlistItem(product))
                    } }
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)} 
                    className="w-1/6 text-white text-6xl">
                    {wishlistItems.some((item) => item.id === product.id) ? "♥" : "♡"}
                  </button>
                </div>
              </Link>
            </div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full rounded-lg mb-4"
            />
            <div className="flex justify-between items-end px-4">
              <h3 className="text-2xl font-semibold text-black mb-2 font-mainFont w-3/5">
                {product.title}
              </h3>
              <p className="text-3xl text-black mb-4 font-mainFont">
                <span className="font-bold">{product.price} €</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-black text-white border border-black font-sndFont 
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black
          transition-all duration-300"
        >
          « Précédent
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          className="px-6 py-2 bg-black text-white border border-black font-sndFont 
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black
          transition-all duration-300"
        >
          Suivant »
        </button>
      </div>
    </div>
  );
};

export default ProductList;
