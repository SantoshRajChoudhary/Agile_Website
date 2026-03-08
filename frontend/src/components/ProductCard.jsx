import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-xl shadow-lg bg-white overflow-hidden hover:scale-105 transition duration-300">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200" />
      )}

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>

        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
