import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-2xl tracking-tight">
          <span className="text-yellow-400">PBP</span>
          <span className="text-white">SHOP MOD 1</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-yellow-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Inicio
          </Link>

          {/* Carrito con contador */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-gray-800 hover:border-yellow-400 border border-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:text-yellow-400"
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span className="bg-yellow-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
