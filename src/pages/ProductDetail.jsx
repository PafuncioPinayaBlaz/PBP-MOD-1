import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import { USD_TO_BS } from '../services/api'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) return <p className="text-center py-20 text-gray-500">Producto no encontrado</p>

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-yellow-400 text-sm mb-8 transition-colors"
      >
        ← Volver a productos
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Imagen grande */}
        <div className="bg-white rounded-xl p-8 flex items-center justify-center min-h-72 border border-gray-800">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="max-w-full max-h-72 object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
            {product.category}
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-white">
            {product.title}
          </h1>

          {/* Precio */}
          <div className="text-4xl font-bold text-yellow-400 font-mono">
            Bs. {(product.price * USD_TO_BS).toFixed(2)}
          </div>

          {/* Descripción completa */}
          <p className="text-gray-400 leading-relaxed text-sm">
            {product.description}
          </p>

          {/* Meta */}
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Rating</p>
              <p className="font-semibold text-white">⭐ {product.rating}</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Stock</p>
              <p className="font-semibold text-white">{product.stock} usd</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Marca</p>
              <p className="font-semibold text-white">{product.brand || '—'}</p>
            </div>
          </div>

          {/* Botón agregar al carrito */}
          <button
            onClick={handleAdd}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
              added
                ? 'bg-green-400 text-black'
                : 'bg-yellow-400 hover:bg-yellow-300 text-black hover:scale-105'
            }`}
          >
            {added ? '✓ Agregado al carrito' : 'Agregar al carrito 🛒'}
          </button>
        </div>
      </div>
    </main>
  )
}
