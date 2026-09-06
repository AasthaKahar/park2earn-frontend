const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  })
  if (!response.ok) throw new Error(`Park2Earn API request failed: ${response.status}`)
  return response.json()
}

export const api = {
  auth: {
    login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    register: (payload) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  },
  vehicles: {
    list: (query = '') => request(`/api/vehicles${query}`),
    get: (id) => request(`/api/vehicles/${id}`),
  },
  bookings: {
    list: () => request('/api/bookings'),
    create: (payload) => request('/api/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  },
  wallet: { get: () => request('/api/wallet') },
  notifications: { list: () => request('/api/notifications') },
  reviews: { list: (vehicleId) => request(`/api/reviews?vehicleId=${vehicleId}`) },
}
