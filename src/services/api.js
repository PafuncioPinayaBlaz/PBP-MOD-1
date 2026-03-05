const BASE_URL = 'https://dummyjson.com'
export const LIMIT = 8

export async function getProducts(page = 1, search = '') {
  const skip = (page - 1) * LIMIT
  const url = search
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${LIMIT}&skip=${skip}`
    : `${BASE_URL}/products?limit=${LIMIT}&skip=${skip}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error al obtener productos')
  return res.json()
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Producto no encontrado')
  return res.json()
}

export const USD_TO_BS = 6.97