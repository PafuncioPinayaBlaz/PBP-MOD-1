import { LIMIT } from '../services/api'

export default function Pagination({ page, total, onPrev, onNext }) {
  const totalPages = Math.ceil(total / LIMIT)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-5 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-sm font-medium transition-all hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:text-white"
      >
        ← Anterior
      </button>

      <span className="text-gray-400 text-sm">
        Página <span className="text-white font-semibold">{page}</span> de{' '}
        <span className="text-white font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="px-5 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-sm font-medium transition-all hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:text-white"
      >
        Siguiente →
      </button>
    </div>
  )
}
