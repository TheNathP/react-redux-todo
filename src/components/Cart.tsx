import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

// Cart
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items); 
  const dispatch = useDispatch();
  const total = useSelector((state: RootState) => state.cart.total);


  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold font-mainFont text-black mb-12">Votre Panier</h1>

      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-500 font-sndFont">Votre panier est vide.</p>
      ) : (
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 font-sndFont">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-8 shadow-md border border-gray-200 flex items-center gap-6">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-32 h-32 object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold font-mainFont text-gray-800 mb-4">{item.title}</h2>
                <p className="text-lg text-gray-600 mb-4">Prix : {(item.price * (item.quantity ?? 0)).toFixed(2)} €</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, quantity: (item.quantity ?? 1) - 1 }))
                    }
                    disabled={(item.quantity ?? 0) <= 1}
                    className="bg-black text-white text-xl px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-all duration-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))
                    }
                    className="w-16 text-center text-2xl border border-gray-300"
                  />
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, quantity: (item.quantity ?? 0) + 1 }))
                    }
                    className="bg-black text-white text-xl px-4 py-2 hover:bg-gray-800 transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-500 border border-red-500 text-white px-6 py-2 hover:bg-white hover:text-red-500 transition-all duration-300"
              >
                Supprimer
              </button>
            </div>
          ))}
          
          <div className="col-span-full text-right mt-8">
            <h2 className="text-3xl font-extrabold text-black">Total : {total.toFixed(2)} €</h2>
            <button className="mt-4 bg-black text-white px-8 py-4 hover:bg-gray-800 transition-all duration-300">
              Passer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Cart;
