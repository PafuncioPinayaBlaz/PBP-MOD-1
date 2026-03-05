export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 rounded-full px-5 py-3 pr-12 outline-none transition-colors text-sm"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        🔍
      </span>
    </div>
  )
}
