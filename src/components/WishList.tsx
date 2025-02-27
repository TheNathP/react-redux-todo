import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../store/store";
import { toggleWishlistItem, clearWishlist } from '../store/wishlistSlice';

const WishList = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-gray-50 min-h-screen flex flex-col items-center py-12">
        <h1 className="text-4xl font-extrabold font-mainFont text-black mb-12">Votre Liste de Favoris</h1>

        {wishlist.length === 0 ? (
            <p className="text-xl text-gray-500 font-sndFont">Votre liste de favoris est vide.</p>
        ) : (
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 font-sndFont">
        {wishlist.map((item) => (
            <div key={item.id} className="bg-white p-8 shadow-md border border-gray-200 flex items-center gap-6">
            <img
                src={item.thumbnail}
                alt={item.title}
                className="w-32 h-32 object-cover"
            />
            <div className="flex-1">
                <h2 className="text-2xl font-bold font-mainFont text-gray-800 mb-4">{item.title}</h2>
                <p className="text-lg text-gray-600 mb-4">Prix : {item.price.toFixed(2)} €</p>
            </div>
            <button
                onClick={() => dispatch(toggleWishlistItem(item))}
                className="bg-red-500 border border-red-500 text-white px-6 py-2 hover:bg-white hover:text-red-500 transition-all duration-300"
            >
                Retirer
            </button>
        </div>
        ))}

            <div className="col-span-full text-right mt-8">
                <button
                onClick={() => dispatch(clearWishlist())}
                className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-all duration-300"
                >
                Vider la liste
                </button>
            </div>
        </div>
    )}
    </div>

  );
};

export default WishList;
