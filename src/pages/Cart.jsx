import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { USD_TO_BS } from '../services/api'

export default function Cart() {
  const { cart, removeFromCart, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-white mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-8">Agrega productos para comenzar</p>
        <button
          onClick={() => navigate('/')}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
        >
          Ver productos
        </button>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-white mb-8">
        Mi Carrito <span className="text-gray-500 text-xl font-normal">({totalItems} productos)</span>
      </h1>

      {/* Lista de productos */}
      <div className="flex flex-col gap-3 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-700 transition-colors"
          >
            {/* Imagen */}
            <div className="w-16 h-16 bg-white rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{item.title}</p>
              <p className="text-yellow-400 font-bold font-mono text-sm mt-1">
                Bs. {(item.price * USD_TO_BS).toFixed(2)} × {item.qty}
              </p>
            </div>

            {/* Subtotal por item */}
            <div className="text-right mr-2">
              <p className="text-white font-bold font-mono">
                Bs. {(item.price * item.qty * USD_TO_BS).toFixed(2)}
              </p>
            </div>

            {/* Botón eliminar */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="w-9 h-9 border border-gray-700 text-gray-500 rounded-lg flex items-center justify-center hover:border-red-500 hover:text-red-400 transition-all flex-shrink-0"
              title="Eliminar"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Resumen / Total */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between text-gray-400 text-sm mb-3">
          <span>Subtotal ({totalItems} productos)</span>
          {/* Corregido: uso de totalPrice (con P mayúscula) y validación de seguridad */}
          <span>Bs. {((totalPrice || 0) * USD_TO_BS).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400 text-sm mb-4">
          <span>Envío</span>
          <span className="text-green-400">Gratis</span>
        </div>
        <div className="flex justify-between items-center text-xl font-extrabold text-yellow-400 border-t border-gray-800 pt-4 font-mono">
          <span className="text-white font-bold">Total</span>
          <span>Bs. {((totalPrice || 0) * USD_TO_BS).toFixed(2)}</span>
        </div>
        <button
          onClick={() => alert('¡Gracias por tu compra! 🎉')}
          className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-xl transition-all hover:scale-105 text-base"
        >
          Proceder al pago →
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full mt-2 border border-gray-700 text-gray-400 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
        >
          Seguir comprando
        </button>
      </div>
    </main>
  )
}