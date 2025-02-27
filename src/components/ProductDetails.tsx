import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  if (!id) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );

  if (!product) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="w-3/4 flex flex-col md:flex-row justify-center items-center gap-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/2 h-auto object-cover"
          />
          <div className="w-full md:w-1/2 py-8 flex flex-col justify-between text-center md:text-left">
            <h1 className="text-5xl font-extrabold font-mainFont mb-6">{product.title}</h1>
            <p className="text-xl font-light font-sndFont mb-4">Catégorie : {product.category}</p>
            <p className="text-xl font-light font-sndFont mb-4">Marque : {product.brand}</p>
            <Link
              to="/cart"
              onClick={() => dispatch(addToCart(product))}
              className="bg-white text-black font-sndFont text-center border border-white 
              mt-8 px-6 py-3 font-semibold hover:text-white hover:bg-transparent transition-all duration-300"
            >
              Ajouter au panier
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 font-sndFont grid grid-cols-1 md:grid-cols-2 gap-12 w-3/4">
        <div>
          <p className="text-black text-xl leading-relaxed mb-8">{product.description}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-black to-gray-800 text-white mb-6 p-2 ">
            Prix : {product.price} € <span className="text-lg text-red-500">(-{product.discountPercentage}%)</span>
          </p>
          <p className="text-black text-xl mb-2">Évaluation : {product.rating} / 5</p>
          <p className="text-black text-xl">
            Stock restant : {product.stock}
            <span className="bg-red-500 text-lg ml-4 px-2">{product.availabilityStatus}</span>
          </p>
        </div>

        <div className="bg-white p-8 shadow-md border border-gray-200">
          <p className="mb-4 text-black">SKU : {product.sku}</p>
          <p className="mb-4 text-black">Poids : {product.weight} kg</p>
          <p className="mb-4 text-black">
            Dimensions : {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
          </p>
          <p className="mb-4 text-black">Garantie : {product.warrantyInformation}</p>
          <p className="mb-4 text-black">Politique de retour : {product.returnPolicy}</p>
          <p className="mb-4 text-black">Livraison : {product.shippingInformation}</p>
        </div>
      </div>

      <div className="my-32 w-3/4">
        <h2 className="text-4xl font-bold font-mainFont text-black mb-8">Commentaires</h2>
        <div className="space-y-8 font-sndFont">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg text-black">{review.reviewerName}</p>
                <p className="text-sm text-black">Évaluation : {review.rating} / 5</p>
              </div>
              <p className="text-gray-800 mb-4">{review.comment}</p>
              <p className="text-sm text-gray-500">
                Publié le : {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
