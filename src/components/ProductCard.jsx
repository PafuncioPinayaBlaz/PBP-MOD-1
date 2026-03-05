import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { USD_TO_BS } from '../services/api'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10">
      {/* Imagen */}
      <div className="bg-white flex items-center justify-center p-4 aspect-square overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-44 max-w-full object-contain transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-white leading-snug flex-1">
          {product.title}
        </h3>
        <div className="text-yellow-400 font-bold text-lg font-mono">
          Bs. {(product.price * USD_TO_BS).toFixed(2)}
        </div>
        <div className="text-gray-500 text-xs">
          ⭐ {product.rating} · {product.stock} en stock
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-2 p-4 pt-0">
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="flex-1 border border-gray-700 text-white text-sm py-2 rounded-lg transition-all hover:border-yellow-400 hover:text-yellow-400"
        >
          Ver detalle
        </button>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold py-2 rounded-lg transition-all hover:scale-105"
        >
          + Carrito
        </button>
      </div>

      
    </div>
  )
}
