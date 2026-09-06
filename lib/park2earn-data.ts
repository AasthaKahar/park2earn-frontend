export type Vehicle = { id: string; name: string; brand: string; type: string; fuel: string; transmission: string; seats: number; rate: string; location: string; image: string; status: string; description: string; features: string[] }

export const vehicles: Vehicle[] = [
  { id: 'nexon-ev', name: 'Nexon EV', brand: 'Tata · 2024', type: 'SUV', fuel: 'Electric', transmission: 'Automatic', seats: 5, rate: '₹10.8 / km', location: 'Indiranagar, Bengaluru', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=85', status: 'Available', description: 'A quiet, confident electric SUV for city errands and longer weekend drives.', features: ['Fast charging', '360° camera', 'Connected navigation', 'Climate control'] },
  { id: 'creta', name: 'Creta', brand: 'Hyundai · 2023', type: 'SUV', fuel: 'Petrol', transmission: 'Automatic', seats: 5, rate: '₹12.5 / km', location: 'Hitech City, Hyderabad', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85', status: 'Available', description: 'Comfortable, refined and ready for everyday movement across the city.', features: ['Panoramic sunroof', 'ADAS safety', 'Wireless Android Auto', 'Air purifier'] },
  { id: 'thar', name: 'Thar', brand: 'Mahindra · 2022', type: 'Adventure', fuel: 'Diesel', transmission: 'Manual', seats: 4, rate: '₹15.2 / km', location: 'Koramangala, Bengaluru', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=85', status: 'Available', description: 'An iconic 4x4 built for the open road, trail days and spontaneous escapes.', features: ['4x4 drive', 'Hard top', 'Hill descent control', 'All-terrain tyres'] },
]

export const navItems = [{ label: 'Dashboard', href: '/customer/dashboard' }, { label: 'My Bookings', href: '/customer/bookings' }, { label: 'Wallet', href: '/customer/wallet' }, { label: 'Notifications', href: '/customer/notifications' }, { label: 'Profile', href: '/customer/profile' }]
export const ownerNav = [{ label: 'Dashboard', href: '/owner/dashboard' }, { label: 'My Vehicles', href: '/owner/vehicles' }, { label: 'Add Vehicle', href: '/owner/vehicles/add' }, { label: 'Bookings', href: '/owner/bookings' }, { label: 'Earnings', href: '/owner/earnings' }]
export const adminNav = [{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Users', href: '/admin/users' }, { label: 'Vehicles', href: '/admin/vehicles' }, { label: 'Bookings', href: '/admin/bookings' }, { label: 'Reviews', href: '/admin/reviews' }, { label: 'Analytics', href: '/admin/analytics' }]

export const apiConfig = { baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '', finalAmountsFromBackend: true, authStrategy: 'JWT bearer token' }

export function getVehicle(id: string) { return vehicles.find((vehicle) => vehicle.id === id) ?? vehicles[0] }
export function statusClass(status: string) { return status === 'Completed' || status === 'Available' || status === 'Active' ? 'status-success' : status === 'Pending' ? 'status-warning' : status === 'Rejected' || status === 'Failed' ? 'status-error' : 'status-neutral' }
