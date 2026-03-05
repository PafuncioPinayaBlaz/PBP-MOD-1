import { useState, useEffect, useRef } from 'react'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'

export default function Home() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getProducts(page, query)
        setProducts(data.products || [])
        setTotal(data.total || 0)
      } catch (e) {
        setError('Error al cargar productos')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [page, query])

  // Búsqueda con debounce — resetea paginación
  const handleSearch = (val) => {
    setSearch(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setQuery(val)
      setPage(1) // resetear paginación al buscar
    }, 400)
  }

  return (
    <main className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="flex flex-col items-center text-center py-12 gap-5">
        
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
           Productos<br />
          
        </h1>
        <SearchBar value={search} onChange={handleSearch} />
      </section>

      {/* Header sección */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold">
          {query ? `Resultados para "${query}"` : 'Todos los productos'} — {total} items
        </p>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center text-red-400 py-20">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No se encontraron productos para "{query}"</p>
      ) : (
        // Grid responsive: 1 col mobile, 2 sm, 3 md, 4 lg
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        total={total}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </main>
  )
}
