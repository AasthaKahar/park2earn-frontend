'use client'

import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react'

import {
  DashboardShell,
  EmptyState,
  PageHeader,
  PublicHeader,
  Footer,
} from './app-shell'

import { statusClass } from '@/lib/park2earn-data'
import { apiRequest } from '@/lib/api/client'

// ============================================================
// TYPES
// ============================================================

type VehicleApi = {
  id: number
  brand: string
  model: string
  year: number
  vehicleNumber: string
  fuelType: string
  transmission: string
  seats: number
  rentPerDay: number
  city: string
  address: string
  description: string
  imageUrl: string | null
  available: boolean
  verified: boolean
}

type Booking = {
  id: number
  vehicleId: number
  vehicleBrand: string
  vehicleModel: string
  customerId: number
  customerName: string
  startDate: string
  endDate: string
  totalAmount: number
  status: string
}

type WalletTransaction = {
  id: number
  amount: number
  type: string
  description: string
}

// ============================================================
// HELPERS
// ============================================================

function vehicleImage(vehicle: VehicleApi) {
  if (vehicle.imageUrl) {
    return vehicle.imageUrl
  }

  return '/placeholder.svg'
}

function vehicleName(vehicle: VehicleApi) {
  return `${vehicle.brand} ${vehicle.model}`
}

// ============================================================
// AUTH PAGE
// LOGIN + REGISTER
// ============================================================

export function AuthPage({
  mode,
}: {
  mode: 'login' | 'register'
}) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const [role, setRole] = useState<'CUSTOMER' | 'OWNER'>(
    'CUSTOMER'
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)
    setError('')
    setDone(false)

    try {
      // =========================
      // LOGIN
      // =========================
      if (mode === 'login') {
        const data = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        })

        localStorage.setItem('token', data.token)

        setDone(true)

        if (data.role === 'OWNER') {
          window.location.href = '/owner/dashboard'
        } else if (data.role === 'ADMIN') {
          window.location.href = '/admin/dashboard'
        } else {
          window.location.href = '/customer/dashboard'
        }

        return
      }

      // =========================
      // REGISTER
      // =========================
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          role,
        }),
      })

      setDone(true)

      setTimeout(() => {
        window.location.href = '/login'
      }, 800)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/45">
      <PublicHeader />

      <main className="mx-auto flex max-w-6xl items-center justify-center px-5 py-16 lg:py-24">
        <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl lg:grid-cols-[.85fr_1.15fr]">

          {/* LEFT SIDE */}

          <div className="hidden bg-primary p-10 text-primary-foreground lg:block">

            <ShieldCheck className="size-8" />

            <h1 className="mt-16 text-4xl font-semibold tracking-tight">
              Move with more confidence.
            </h1>

            <p className="mt-5 leading-7 text-primary-foreground/75">
              Verified vehicles, transparent usage-based pricing,
              and a support layer designed around every journey.
            </p>

            {mode === 'register' && (
              <div className="mt-10 space-y-3 text-sm text-primary-foreground/80">
                <p>✓ Book vehicles as a customer</p>
                <p>✓ List your vehicle as an owner</p>
                <p>✓ Manage everything from your dashboard</p>
              </div>
            )}

          </div>

          {/* RIGHT SIDE */}

          <form
            className="p-7 sm:p-10"
            onSubmit={handleSubmit}
          >

            <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">
              Park2Earn account
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {mode === 'login'
                ? 'Welcome back'
                : 'Create your account'}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {mode === 'login'
                ? 'Log in to manage your journeys.'
                : 'Start exploring smarter mobility.'}
            </p>

            {/* FULL NAME */}

            {mode === 'register' && (
              <Field
                label="Full name"
                placeholder="Aastha Kahar"
                value={fullName}
                onChange={setFullName}
              />
            )}

            {/* EMAIL */}

            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
            />

            {/* PASSWORD */}

            <Field
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={setPassword}
            />

            {/* PHONE */}

            {mode === 'register' && (
              <Field
                label="Phone"
                placeholder="9876543210"
                value={phone}
                onChange={setPhone}
              />
            )}

            {/* ROLE */}

            {mode === 'register' && (
              <div className="mt-5">

                <label className="text-sm font-semibold">
                  I want to
                </label>

                <div className="mt-2 grid grid-cols-2 gap-3">

                  {/* CUSTOMER */}

                  <button
                    type="button"
                    onClick={() =>
                      setRole('CUSTOMER')
                    }
                    className={`rounded-xl border px-4 py-4 text-left transition ${
                      role === 'CUSTOMER'
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'border-border bg-background hover:bg-secondary'
                    }`}
                  >
                    <p className="font-semibold">
                      Rent a vehicle
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Book vehicles for your trips.
                    </p>
                  </button>

                  {/* OWNER */}

                  <button
                    type="button"
                    onClick={() =>
                      setRole('OWNER')
                    }
                    className={`rounded-xl border px-4 py-4 text-left transition ${
                      role === 'OWNER'
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'border-border bg-background hover:bg-secondary'
                    }`}
                  >
                    <p className="font-semibold">
                      List my vehicle
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Earn by sharing your vehicle.
                    </p>
                  </button>

                </div>
              </div>
            )}

            {/* ERROR */}

            {error && (
              <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            )}

            {/* SUCCESS */}

            {done && (
              <p className="mt-4 rounded-xl bg-accent p-3 text-sm text-accent-foreground">
                {mode === 'login'
                  ? 'Login successful!'
                  : role === 'OWNER'
                    ? 'Owner account created successfully!'
                    : 'Customer account created successfully!'}
              </p>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {loading
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Log in'
                  : 'Create account'}

              <ArrowRight className="ml-1 inline size-4" />
            </button>

            {/* SWITCH LOGIN / REGISTER */}

            <p className="mt-6 text-center text-sm text-muted-foreground">

              {mode === 'login' ? (
                <>
                  New here?{' '}

                  <Link
                    className="font-semibold text-primary"
                    href="/register"
                  >
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already registered?{' '}

                  <Link
                    className="font-semibold text-primary"
                    href="/login"
                  >
                    Log in
                  </Link>
                </>
              )}

            </p>

          </form>
        </div>
      </main>
    </div>
  )
}

// ============================================================
// INPUT FIELD
// ============================================================

function Field({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: {
  label: string
  placeholder: string
  type?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="mt-5 block text-sm font-medium">
      {label}

      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none ring-primary/30 placeholder:text-muted-foreground/70 focus:ring-4"
      />
    </label>
  )
}

// ============================================================
// VEHICLES PAGE - REAL API
// ============================================================

export function VehiclesPage() {
  const [query, setQuery] = useState('')
  const [apiVehicles, setApiVehicles] = useState<VehicleApi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadVehicles() {
      try {
        setLoading(true)
        setError('')

        const data = await apiRequest('/vehicles')

        setApiVehicles(
          Array.isArray(data) ? data : []
        )
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load vehicles'
        )
      } finally {
        setLoading(false)
      }
    }

    loadVehicles()
  }, [])

  const filtered = apiVehicles.filter((vehicle) =>
    `${vehicle.brand} ${vehicle.model} ${vehicle.city} ${vehicle.address}`
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  return (
    <div>
      <PublicHeader />

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">

        <PageHeader
          eyebrow="Vehicle discovery"
          title="Find your next way to move."
          description="Browse vehicles directly from the Park2Earn backend. Availability and verification status come from the server."
        />

        {/* SEARCH */}

        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 sm:flex-row">

          <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary px-4">

            <Search className="size-4 text-primary" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, vehicle or brand"
              className="w-full bg-transparent py-3 text-sm outline-none"
            />

          </div>

          <button
            type="button"
            className="rounded-xl border border-border px-4 py-3 text-sm font-semibold"
          >
            <SlidersHorizontal className="mr-2 inline size-4" />
            Filters
          </button>

          <select className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
            <option>Recommended</option>
            <option>Rate: low to high</option>
          </select>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-medium">
              Loading vehicles...
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Fetching available vehicles from Park2Earn.
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            title="No vehicles available."
            text={
              query
                ? 'Try another city, vehicle or brand.'
                : 'No available vehicles have been listed yet.'
            }
          />
        )}

        {/* VEHICLES */}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {filtered.map((vehicle) => (
              <article
                key={vehicle.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="relative">

                  <img
                    src={vehicleImage(vehicle)}
                    alt={vehicleName(vehicle)}
                    className="aspect-[1.35/1] w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg'
                    }}
                  />

                  <div className="absolute left-4 top-4 flex gap-2">

                    {vehicle.verified && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Verified
                      </span>
                    )}

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        vehicle.available
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {vehicle.available
                        ? 'Available'
                        : 'Unavailable'}
                    </span>

                  </div>

                </div>

                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h2 className="text-xl font-semibold">
                        {vehicleName(vehicle)}
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {vehicle.year} · {vehicle.city}
                      </p>
                    </div>

                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    {vehicle.fuelType} · {vehicle.transmission} ·{' '}
                    {vehicle.seats} seats
                  </p>

                  <div className="mt-5 flex items-end justify-between border-t border-border pt-4">

                    <div>
                      <p className="text-lg font-semibold">
                        ₹
                        {vehicle.rentPerDay?.toLocaleString(
                          'en-IN'
                        )}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Backend listed rate
                      </p>
                    </div>

                    <Link
                      href={`/vehicles/${vehicle.id}`}
                      className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                      View details
                    </Link>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}

// ============================================================
// VEHICLE DETAIL PAGE - REAL API
// ============================================================

export function VehicleDetailPage({
  id,
}: {
  id: string
}) {
  const [vehicle, setVehicle] = useState<VehicleApi | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadVehicle() {
      try {
        setLoading(true)
        setError('')

        let vehicleId = id

        if (!/^\d+$/.test(id)) {
          const allVehicles = await apiRequest('/vehicles')

          if (Array.isArray(allVehicles)) {
            const found = allVehicles.find(
              (item: VehicleApi) =>
                `${item.brand}-${item.model}`
                  .toLowerCase()
                  .replace(/\s+/g, '-') === id.toLowerCase()
            )

            if (found) {
              vehicleId = String(found.id)
            }
          }
        }

        const data = await apiRequest(
          `/vehicles/${vehicleId}`
        )

        setVehicle(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load vehicle details'
        )
      } finally {
        setLoading(false)
      }
    }

    loadVehicle()
  }, [id])

  if (loading) {
    return (
      <div>
        <PublicHeader />

        <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-medium">
              Loading vehicle details...
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Fetching information from the Park2Earn API.
            </p>
          </div>

        </main>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div>
        <PublicHeader />

        <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
            {error || 'Vehicle not found.'}
          </div>

          <Link
            href="/vehicles"
            className="mt-5 inline-block font-semibold text-primary"
          >
            ← Back to vehicles
          </Link>

        </main>
      </div>
    )
  }

  return (
    <div>
      <PublicHeader />

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">

        <Link
          href="/vehicles"
          className="text-sm font-semibold text-primary"
        >
          ← Back to vehicles
        </Link>

        <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">

          <div>

            <div className="relative">

              <img
                src={vehicleImage(vehicle)}
                alt={vehicleName(vehicle)}
                className="aspect-[1.3/1] w-full rounded-3xl object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg'
                }}
              />

              <div className="absolute left-5 top-5 flex gap-2">

                {vehicle.verified && (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Verified
                  </span>
                )}

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    vehicle.available
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {vehicle.available
                    ? 'Available'
                    : 'Unavailable'}
                </span>

              </div>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">
              {vehicle.city} · {vehicle.year}
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {vehicleName(vehicle)}
            </h1>

            <p className="mt-2 text-muted-foreground">
              Vehicle #{vehicle.id}
            </p>

            <p className="mt-8 leading-7 text-muted-foreground">
              {vehicle.description ||
                'Vehicle details are provided by the Park2Earn backend.'}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">

              {[
                ['Brand', vehicle.brand],
                ['Model', vehicle.model],
                ['Year', String(vehicle.year)],
                ['Fuel', vehicle.fuelType],
                ['Transmission', vehicle.transmission],
                ['Seats', `${vehicle.seats} people`],
                ['City', vehicle.city],
                [
                  'Availability',
                  vehicle.available
                    ? 'Available'
                    : 'Unavailable',
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-secondary p-4"
                >
                  <p className="text-xs text-muted-foreground">
                    {label}
                  </p>

                  <p className="mt-1 font-semibold">
                    {value}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-7 rounded-2xl border border-primary/20 bg-primary/5 p-5">

              <p className="font-semibold">
                Backend listed rate
              </p>

              <p className="mt-2 text-2xl font-semibold">
                ₹
                {vehicle.rentPerDay?.toLocaleString(
                  'en-IN'
                )}
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This value comes directly from the backend.
                Final booking amount should be calculated and
                validated by the server.
              </p>

            </div>

            {vehicle.available ? (
              <Link
                href={`/booking/${vehicle.id}`}
                className="mt-6 flex items-center justify-center rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground"
              >
                Book now
                <ArrowRight className="ml-2 size-4" />
              </Link>
            ) : (
              <button
                disabled
                className="mt-6 w-full rounded-xl bg-secondary px-5 py-3.5 font-semibold text-muted-foreground"
              >
                Vehicle unavailable
              </button>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// ============================================================
// BOOKING PAGE
// ============================================================

export function BookingPage({
  id,
}: {
  id: string
}) {
  const [vehicle, setVehicle] = useState<VehicleApi | null>(null)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [step, setStep] = useState(1)

  const [loadingVehicle, setLoadingVehicle] = useState(true)
  const [creatingBooking, setCreatingBooking] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function loadVehicle() {
      try {
        setLoadingVehicle(true)
        setError('')

        const data = await apiRequest(`/vehicles/${id}`)

        setVehicle(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load vehicle'
        )
      } finally {
        setLoadingVehicle(false)
      }
    }

    loadVehicle()
  }, [id])

  const today = new Date()
    .toISOString()
    .split('T')[0]

  function validateDates() {
    if (!startDate || !endDate) {
      setError('Please select pickup and return dates.')
      return false
    }

    if (startDate < today) {
      setError('Pickup date cannot be in the past.')
      return false
    }

    if (endDate < today) {
      setError('Return date cannot be in the past.')
      return false
    }

    if (endDate < startDate) {
      setError(
        'Return date cannot be before pickup date.'
      )
      return false
    }

    return true
  }

  function continueBooking() {
    setError('')
    setSuccess('')

    if (step === 1) {
      if (!validateDates()) {
        return
      }

      setStep(2)
      return
    }

    if (step === 2) {
      setStep(3)
      return
    }

    if (step === 3) {
      setStep(4)
      return
    }
  }

  async function createBooking() {
    if (!vehicle) {
      setError('Vehicle information is not available.')
      return
    }

    if (!validateDates()) {
      setStep(1)
      return
    }

    try {
      setCreatingBooking(true)
      setError('')
      setSuccess('')

      const booking = await apiRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          vehicleId: vehicle.id,
          startDate,
          endDate,
        }),
      })

      setSuccess(
        `Booking #${booking.id} created successfully.`
      )

      setTimeout(() => {
        window.location.href = `/payment/${booking.id}`
      }, 800)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create booking'
      )
    } finally {
      setCreatingBooking(false)
    }
  }

  if (loadingVehicle) {
    return (
      <div>
        <PublicHeader />

        <main className="mx-auto max-w-6xl px-5 py-16 lg:px-8">

          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-medium">
              Loading vehicle...
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Fetching vehicle information from Park2Earn.
            </p>
          </div>

        </main>
      </div>
    )
  }

  if (error && !vehicle) {
    return (
      <div>
        <PublicHeader />

        <main className="mx-auto max-w-6xl px-5 py-16 lg:px-8">

          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
            {error}
          </div>

          <Link
            href="/vehicles"
            className="mt-5 inline-block font-semibold text-primary"
          >
            ← Back to vehicles
          </Link>

        </main>
      </div>
    )
  }

  if (!vehicle) {
    return null
  }

  return (
    <div>
      <PublicHeader />

      <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">

        <PageHeader
          eyebrow="Booking flow"
          title="Plan your journey"
          description="Select your dates and review your booking before creating it."
        />

        {/* STEPS */}

        <div className="mb-8 flex items-center gap-2 text-sm">

          {[
            'Trip details',
            'Estimate',
            'Review',
            'Payment',
          ].map((label, index) => {

            const number = index + 1

            return (
              <div
                key={label}
                className={`flex items-center gap-2 ${
                  step === number
                    ? 'font-semibold text-primary'
                    : 'text-muted-foreground'
                }`}
              >

                <span
                  className={`flex size-8 items-center justify-center rounded-full ${
                    step >= number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  {step > number ? (
                    <Check className="size-4" />
                  ) : (
                    number
                  )}
                </span>

                <span className="hidden sm:block">
                  {label}
                </span>

                {number < 4 && (
                  <span className="mx-1 text-border">
                    /
                  </span>
                )}

              </div>
            )
          })}

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-5 rounded-xl bg-accent p-4 text-sm text-accent-foreground">
            {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* LEFT */}

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">

            {/* STEP 1 */}

            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold">
                  Trip details
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Choose when you want to use this vehicle.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">

                  <label className="mt-5 block text-sm font-medium">
                    Pickup date

                    <input
                      type="date"
                      min={today}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value)
                        setError('')
                      }}
                      className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-4 focus:ring-primary/20"
                    />
                  </label>

                  <label className="mt-5 block text-sm font-medium">
                    Return date

                    <input
                      type="date"
                      min={startDate || today}
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value)
                        setError('')
                      }}
                      className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-4 focus:ring-primary/20"
                    />
                  </label>

                </div>

                <div className="mt-6 rounded-xl bg-secondary p-4">
                  <p className="text-sm font-medium">
                    Vehicle availability
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {vehicle.available
                      ? 'This vehicle is currently available.'
                      : 'This vehicle is currently unavailable.'}
                  </p>
                </div>
              </>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold">
                  Booking estimate
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Your booking dates have been selected.
                </p>

                <div className="mt-6 space-y-4">

                  <div className="rounded-xl bg-secondary p-5">
                    <p className="text-xs text-muted-foreground">
                      Pickup
                    </p>

                    <p className="mt-1 font-semibold">
                      {startDate}
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary p-5">
                    <p className="text-xs text-muted-foreground">
                      Return
                    </p>

                    <p className="mt-1 font-semibold">
                      {endDate}
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">

                    <p className="text-sm font-semibold">
                      Backend calculated amount
                    </p>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      The final booking amount is calculated by
                      the Spring Boot backend. The frontend does
                      not trust or submit its own total amount.
                    </p>

                  </div>

                </div>
              </>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold">
                  Review booking
                </h2>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Vehicle
                    </span>

                    <strong>
                      {vehicleName(vehicle)}
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Pickup
                    </span>

                    <strong>
                      {startDate}
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Return
                    </span>

                    <strong>
                      {endDate}
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Vehicle ID
                    </span>

                    <strong>
                      #{vehicle.id}
                    </strong>
                  </div>

                </div>

                <div className="mt-6 rounded-xl bg-secondary p-5">

                  <p className="text-sm font-semibold">
                    Before continuing
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Park2Earn will check vehicle availability
                    and create the booking on the server.
                  </p>

                </div>
              </>
            )}

            {/* STEP 4 */}

            {step === 4 && (
              <>
                <h2 className="text-xl font-semibold">
                  Create booking
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Click below to create your booking. Once the
                  backend successfully creates it, you will be
                  taken to the payment page.
                </p>

                <div className="mt-6 rounded-xl border border-border p-5">

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Vehicle
                    </span>

                    <strong>
                      {vehicleName(vehicle)}
                    </strong>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-muted-foreground">
                      Dates
                    </span>

                    <strong>
                      {startDate} → {endDate}
                    </strong>
                  </div>

                </div>
              </>
            )}

            {/* BUTTON */}

            <div className="mt-8 flex gap-3">

              {step > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    setStep(step - 1)
                  }}
                  disabled={creatingBooking}
                  className="rounded-xl border border-border px-5 py-3.5 text-sm font-semibold disabled:opacity-50"
                >
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={continueBooking}
                  disabled={!vehicle.available}
                  className="rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="ml-2 inline size-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={createBooking}
                  disabled={creatingBooking}
                  className="rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                >
                  {creatingBooking
                    ? 'Creating booking...'
                    : 'Create booking'}

                  {!creatingBooking && (
                    <ArrowRight className="ml-2 inline size-4" />
                  )}
                </button>
              )}

            </div>

          </section>

          {/* RIGHT VEHICLE CARD */}

          <aside className="h-fit rounded-2xl border border-border bg-card p-5">

            <img
              src={vehicleImage(vehicle)}
              alt={vehicleName(vehicle)}
              className="aspect-[1.7/1] w-full rounded-xl object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg'
              }}
            />

            <div className="mt-4 flex gap-2">

              {vehicle.verified && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Verified
                </span>
              )}

              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold">
                {vehicle.available
                  ? 'Available'
                  : 'Unavailable'}
              </span>

            </div>

            <h3 className="mt-4 text-xl font-semibold">
              {vehicleName(vehicle)}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {vehicle.year} · {vehicle.city}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-xl bg-secondary p-3">
                <p className="text-xs text-muted-foreground">
                  Fuel
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {vehicle.fuelType}
                </p>
              </div>

              <div className="rounded-xl bg-secondary p-3">
                <p className="text-xs text-muted-foreground">
                  Seats
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {vehicle.seats}
                </p>
              </div>

              <div className="rounded-xl bg-secondary p-3">
                <p className="text-xs text-muted-foreground">
                  Transmission
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {vehicle.transmission}
                </p>
              </div>

              <div className="rounded-xl bg-secondary p-3">
                <p className="text-xs text-muted-foreground">
                  Rate
                </p>

                <p className="mt-1 text-sm font-semibold">
                  ₹
                  {vehicle.rentPerDay?.toLocaleString(
                    'en-IN'
                  )}
                </p>
              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  )
}

// ============================================================
// PORTAL PAGE
// CUSTOMER / OWNER / ADMIN
// ============================================================

export function PortalPage({
  role,
  section,
}: {
  role: 'customer' | 'owner' | 'admin'
  section: string
}) {
  const title =
    section === 'dashboard'
      ? `${role[0].toUpperCase()}${role.slice(1)} dashboard`
      : section.replaceAll('-', ' ')

  // ============================================================
  // CUSTOMER DATA
  // ============================================================

  const [bookings, setBookings] = useState<Booking[]>([])
  const [walletBalance, setWalletBalance] = useState<number | null>(null)
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])

  // ============================================================
  // OWNER VEHICLES
  // ============================================================

  const [ownerVehicles, setOwnerVehicles] = useState<any[]>([])
  const [ownerVehiclesLoading, setOwnerVehiclesLoading] = useState(false)
  const [ownerVehiclesError, setOwnerVehiclesError] = useState('')

  // ============================================================
  // OWNER BOOKINGS
  // ============================================================

  const [ownerBookings, setOwnerBookings] = useState<Booking[]>([])
  const [ownerBookingsLoading, setOwnerBookingsLoading] = useState(false)
  const [ownerBookingsError, setOwnerBookingsError] = useState('')
  const [bookingActionLoading, setBookingActionLoading] =
    useState<number | null>(null)

  // ============================================================
  // GENERAL STATES
  // ============================================================

  const [walletAmount, setWalletAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [walletLoading, setWalletLoading] = useState(false)
  const [addingMoney, setAddingMoney] = useState(false)

  const [error, setError] = useState('')
  const [walletMessage, setWalletMessage] = useState('')

  // ============================================================
  // CUSTOMER DASHBOARD DATA
  // ============================================================

  useEffect(() => {
    if (role !== 'customer' || section !== 'dashboard') {
      return
    }

    async function loadCustomerDashboard() {
      setLoading(true)
      setError('')

      try {
        const [
          bookingData,
          balanceData,
          transactionData,
        ] = await Promise.all([
          apiRequest('/bookings/my'),
          apiRequest('/wallet/balance'),
          apiRequest('/wallet/transactions'),
        ])

        setBookings(
          Array.isArray(bookingData)
            ? bookingData
            : []
        )

        setWalletBalance(
          typeof balanceData === 'number'
            ? balanceData
            : Number(balanceData ?? 0)
        )

        setTransactions(
          Array.isArray(transactionData)
            ? transactionData
            : []
        )
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load dashboard data'
        )
      } finally {
        setLoading(false)
      }
    }

    loadCustomerDashboard()
  }, [role, section])

  // ============================================================
  // CUSTOMER WALLET DATA
  // ============================================================

  useEffect(() => {
    if (role !== 'customer' || section !== 'wallet') {
      return
    }

    async function loadWallet() {
      setWalletLoading(true)
      setError('')

      try {
        const [
          balanceData,
          transactionData,
        ] = await Promise.all([
          apiRequest('/wallet/balance'),
          apiRequest('/wallet/transactions'),
        ])

        setWalletBalance(
          typeof balanceData === 'number'
            ? balanceData
            : Number(balanceData ?? 0)
        )

        setTransactions(
          Array.isArray(transactionData)
            ? transactionData
            : []
        )
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load wallet'
        )
      } finally {
        setWalletLoading(false)
      }
    }

    loadWallet()
  }, [role, section])

  // ============================================================
  // OWNER VEHICLES DATA
  // ============================================================

  useEffect(() => {
    if (role !== 'owner' || section !== 'vehicles') {
      return
    }

    async function loadOwnerVehicles() {
      setOwnerVehiclesLoading(true)
      setOwnerVehiclesError('')

      try {
        const data = await apiRequest('/vehicles/my')

        setOwnerVehicles(
          Array.isArray(data)
            ? data
            : []
        )
      } catch (err) {
        setOwnerVehiclesError(
          err instanceof Error
            ? err.message
            : 'Unable to load your vehicles'
        )
      } finally {
        setOwnerVehiclesLoading(false)
      }
    }

    loadOwnerVehicles()
  }, [role, section])

  // ============================================================
  // OWNER BOOKINGS DATA
  // ============================================================

  useEffect(() => {
    if (role !== 'owner' || section !== 'bookings') {
      return
    }

    async function loadOwnerBookings() {
      setOwnerBookingsLoading(true)
      setOwnerBookingsError('')

      try {
        const data = await apiRequest('/bookings/owner')

        setOwnerBookings(
          Array.isArray(data)
            ? data
            : []
        )
      } catch (err) {
        setOwnerBookingsError(
          err instanceof Error
            ? err.message
            : 'Unable to load owner bookings'
        )
      } finally {
        setOwnerBookingsLoading(false)
      }
    }

    loadOwnerBookings()
  }, [role, section])

  // ============================================================
  // OWNER BOOKING ACTION
  // ============================================================

  async function handleBookingAction(
    bookingId: number,
    action: 'accept' | 'reject' | 'complete'
  ) {
    try {
      setBookingActionLoading(bookingId)
      setOwnerBookingsError('')

      await apiRequest(
        `/bookings/${bookingId}/${action}`,
        {
          method: 'PUT',
        }
      )

      const data = await apiRequest('/bookings/owner')

      setOwnerBookings(
        Array.isArray(data)
          ? data
          : []
      )
    } catch (err) {
      setOwnerBookingsError(
        err instanceof Error
          ? err.message
          : `Unable to ${action} booking`
      )
    } finally {
      setBookingActionLoading(null)
    }
  }

  // ============================================================
  // ADD MONEY
  // ============================================================

  async function handleAddMoney() {
    const amount = Number(walletAmount)

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount.')
      return
    }

    try {
      setAddingMoney(true)
      setError('')
      setWalletMessage('')

      await apiRequest(
        `/wallet/add-money?amount=${encodeURIComponent(amount)}`,
        {
          method: 'POST',
        }
      )

      const [
        balanceData,
        transactionData,
      ] = await Promise.all([
        apiRequest('/wallet/balance'),
        apiRequest('/wallet/transactions'),
      ])

      setWalletBalance(
        typeof balanceData === 'number'
          ? balanceData
          : Number(balanceData ?? 0)
      )

      setTransactions(
        Array.isArray(transactionData)
          ? transactionData
          : []
      )

      setWalletAmount('')

      setWalletMessage(
        `₹${amount.toLocaleString(
          'en-IN'
        )} added to your wallet successfully.`
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to add money'
      )
    } finally {
      setAddingMoney(false)
    }
  }

  // ============================================================
  // DATE CALCULATIONS
  // ============================================================

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const activeBookings = bookings.filter((booking) => {
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)

    return (
      booking.status === 'ACCEPTED' &&
      start <= today &&
      end >= today
    )
  })

  const upcomingBookings = bookings.filter((booking) => {
    const start = new Date(booking.startDate)

    return (
      start > today &&
      ['PENDING', 'ACCEPTED'].includes(
        booking.status
      )
    )
  })

  const completedBookings = bookings.filter(
    (booking) => booking.status === 'COMPLETED'
  )

  return (
    <DashboardShell role={role}>

      <PageHeader
        eyebrow={`${role} workspace`}
        title={title}
        description={
          role === 'customer' && section === 'dashboard'
            ? 'Your latest bookings, trips and wallet activity.'
            : section === 'wallet'
              ? 'Manage your Park2Earn wallet and view transaction history.'
              : role === 'owner' && section === 'bookings'
                ? 'Review customer booking requests and manage your vehicle bookings.'
                : 'Live values, statuses and actions are provided by your Spring Boot API.'
        }
        action={
          section === 'vehicles' && role === 'owner'
            ? (
              <Link
                href="/owner/vehicles/add"
                className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Plus className="mr-2 inline size-4" />
                Add vehicle
              </Link>
            )
            : undefined
        }
      />

      {/* ========================================================
          CUSTOMER DASHBOARD
      ======================================================== */}

      {role === 'customer' && section === 'dashboard' && (
        <>
          {loading && (
            <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
              Loading your dashboard...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-muted-foreground">
                    Active booking
                  </p>

                  <p className="mt-4 text-2xl font-semibold">
                    {activeBookings.length}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Currently active trips
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-muted-foreground">
                    Upcoming bookings
                  </p>

                  <p className="mt-4 text-2xl font-semibold">
                    {upcomingBookings.length}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Future confirmed or pending trips
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-muted-foreground">
                    Completed trips
                  </p>

                  <p className="mt-4 text-2xl font-semibold">
                    {completedBookings.length}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Successfully completed journeys
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-muted-foreground">
                    Wallet balance
                  </p>

                  <p className="mt-4 text-2xl font-semibold">
                    ₹
                    {(walletBalance ?? 0).toLocaleString(
                      'en-IN'
                    )}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Available wallet balance
                  </p>
                </div>

              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">

                <div className="flex items-center justify-between border-b border-border p-5">

                  <div>
                    <h2 className="font-semibold">
                      Recent bookings
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Your latest vehicle bookings
                    </p>
                  </div>

                  <Link
                    href="/customer/bookings"
                    className="text-sm font-semibold text-primary"
                  >
                    View all
                  </Link>

                </div>

                {bookings.length === 0 ? (
                  <div className="p-8 text-center">

                    <p className="font-medium">
                      No bookings yet
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Start exploring vehicles and plan your next trip.
                    </p>

                    <Link
                      href="/vehicles"
                      className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      Explore vehicles
                    </Link>

                  </div>
                ) : (
                  <div className="divide-y divide-border">

                    {bookings.slice(0, 5).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                      >

                        <div>

                          <p className="font-medium">
                            {booking.vehicleBrand}{' '}
                            {booking.vehicleModel}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Booking #{booking.id} ·{' '}
                            {booking.startDate} →{' '}
                            {booking.endDate}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Amount: ₹
                            {booking.totalAmount?.toLocaleString(
                              'en-IN'
                            ) ?? '0'}
                          </p>

                        </div>

                        <div className="flex items-center gap-3">

                          <span
                            className={`${statusClass(
                              booking.status
                            )} rounded-full px-3 py-1 text-xs font-semibold`}
                          >
                            {booking.status}
                          </span>

                          <Link
                            href={`/customer/bookings/${booking.id}`}
                            className="text-sm font-semibold text-primary"
                          >
                            View
                          </Link>

                        </div>

                      </div>
                    ))}

                  </div>
                )}

              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">

                <div className="border-b border-border p-5">

                  <h2 className="font-semibold">
                    Recent wallet activity
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Latest wallet transactions
                  </p>

                </div>

                {transactions.length === 0 ? (
                  <div className="p-6 text-sm text-muted-foreground">
                    No wallet transactions yet.
                  </div>
                ) : (
                  <div className="divide-y divide-border">

                    {transactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-5"
                      >

                        <div>

                          <p className="font-medium">
                            {transaction.description}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {transaction.type}
                          </p>

                        </div>

                        <p className="font-semibold">
                          ₹
                          {transaction.amount?.toLocaleString(
                            'en-IN'
                          ) ?? '0'}
                        </p>

                      </div>
                    ))}

                  </div>
                )}

              </div>
            </>
          )}
        </>
      )}

      {/* ========================================================
          CUSTOMER WALLET
      ======================================================== */}

      {role === 'customer' && section === 'wallet' && (
        <div className="mt-6">

          {walletLoading && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="font-medium">
                Loading wallet...
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Fetching your balance and transactions.
              </p>
            </div>
          )}

          {!walletLoading && (
            <>
              {error && (
                <div className="mb-5 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}

              {walletMessage && (
                <div className="mb-5 rounded-2xl bg-accent p-4 text-sm text-accent-foreground">
                  <Check className="mr-2 inline size-4" />
                  {walletMessage}
                </div>
              )}

              <div className="grid gap-5 lg:grid-cols-2">

                <div className="rounded-2xl border border-border bg-card p-6">

                  <p className="text-sm text-muted-foreground">
                    Available wallet balance
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight">
                    ₹
                    {(walletBalance ?? 0).toLocaleString(
                      'en-IN'
                    )}
                  </p>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Use your Park2Earn wallet to pay for bookings.
                  </p>

                </div>

                <div className="rounded-2xl border border-border bg-card p-6">

                  <h2 className="text-lg font-semibold">
                    Add money
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Add funds to your Park2Earn wallet.
                  </p>

                  <div className="mt-5 flex gap-3">

                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={walletAmount}
                      onChange={(e) => {
                        setWalletAmount(e.target.value)
                        setError('')
                        setWalletMessage('')
                      }}
                      placeholder="Enter amount"
                      className="min-w-0 flex-1 rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-4 focus:ring-primary/20"
                    />

                    <button
                      type="button"
                      onClick={handleAddMoney}
                      disabled={addingMoney}
                      className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-60"
                    >
                      {addingMoney
                        ? 'Adding...'
                        : 'Add money'}
                    </button>

                  </div>

                </div>

              </div>

              <div className="mt-5 rounded-2xl border border-border bg-card p-6">

                <p className="text-sm font-semibold">
                  Quick add
                </p>

                <div className="mt-3 flex flex-wrap gap-3">

                  {[500, 1000, 2000, 5000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() =>
                        setWalletAmount(String(amount))
                      }
                      className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
                    >
                      ₹{amount.toLocaleString('en-IN')}
                    </button>
                  ))}

                </div>

              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">

                <div className="border-b border-border p-6">

                  <h2 className="font-semibold">
                    Transaction history
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your latest wallet activity from the backend.
                  </p>

                </div>

                {transactions.length === 0 ? (
                  <div className="p-8 text-center">

                    <p className="font-medium">
                      No transactions yet
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Add money to start using your wallet.
                    </p>

                  </div>
                ) : (
                  <div className="divide-y divide-border">

                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                      >

                        <div>

                          <p className="font-medium">
                            {transaction.description}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Transaction #{transaction.id} ·{' '}
                            {transaction.type}
                          </p>

                        </div>

                        <p className="font-semibold">
                          ₹
                          {transaction.amount?.toLocaleString(
                            'en-IN'
                          ) ?? '0'}
                        </p>

                      </div>
                    ))}

                  </div>
                )}

              </div>
            </>
          )}

        </div>
      )}

      {/* ========================================================
          OWNER VEHICLES
      ======================================================== */}

      {role === 'owner' && section === 'vehicles' && (
        <div className="mt-6">

          {ownerVehiclesLoading && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="font-medium">
                Loading your vehicles...
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Fetching vehicles from Park2Earn backend.
              </p>
            </div>
          )}

          {!ownerVehiclesLoading && ownerVehiclesError && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive">
              {ownerVehiclesError}
            </div>
          )}

          {!ownerVehiclesLoading &&
            !ownerVehiclesError &&
            ownerVehicles.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">

                <p className="text-lg font-semibold">
                  No vehicles added yet
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Add your first vehicle to start earning with Park2Earn.
                </p>

                <Link
                  href="/owner/vehicles/add"
                  className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <Plus className="mr-2 size-4" />
                  Add vehicle
                </Link>

              </div>
            )}

          {!ownerVehiclesLoading &&
            !ownerVehiclesError &&
            ownerVehicles.length > 0 && (

              <div className="overflow-hidden rounded-2xl border border-border bg-card">

                <div className="flex items-center justify-between border-b border-border p-5">

                  <div>
                    <h2 className="font-semibold">
                      My vehicles
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Vehicles registered under your owner account.
                    </p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {ownerVehicles.length} vehicle
                    {ownerVehicles.length !== 1 ? 's' : ''}
                  </span>

                </div>

                <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">

                  {ownerVehicles.map((vehicle) => (

                    <div
                      key={vehicle.id}
                      className="overflow-hidden rounded-2xl border border-border bg-background"
                    >

                      {/* IMAGE */}

                      <div className="relative h-48 bg-secondary">

                        {vehicle.imageUrl ? (
                          <img
                            src={vehicle.imageUrl}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No vehicle image
                          </div>
                        )}

                        <div className="absolute left-3 top-3 flex gap-2">

                          {vehicle.verified && (
                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                              Verified
                            </span>
                          )}

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              vehicle.available
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {vehicle.available
                              ? 'Available'
                              : 'Unavailable'}
                          </span>

                        </div>

                      </div>

                      {/* DETAILS */}

                      <div className="p-5">

                        <div className="flex items-start justify-between gap-3">

                          <div>
                            <h3 className="text-xl font-semibold">
                              {vehicle.brand}{' '}
                              {vehicle.model}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {vehicle.year} · {vehicle.city}
                            </p>
                          </div>

                          <span className="text-xs font-medium text-muted-foreground">
                            #{vehicle.id}
                          </span>

                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">

                          <div className="rounded-xl bg-secondary p-3">
                            <p className="text-muted-foreground">
                              Fuel
                            </p>

                            <p className="mt-1 font-semibold">
                              {vehicle.fuelType}
                            </p>
                          </div>

                          <div className="rounded-xl bg-secondary p-3">
                            <p className="text-muted-foreground">
                              Transmission
                            </p>

                            <p className="mt-1 font-semibold">
                              {vehicle.transmission}
                            </p>
                          </div>

                          <div className="rounded-xl bg-secondary p-3">
                            <p className="text-muted-foreground">
                              Seats
                            </p>

                            <p className="mt-1 font-semibold">
                              {vehicle.seats}
                            </p>
                          </div>

                          <div className="rounded-xl bg-secondary p-3">
                            <p className="text-muted-foreground">
                              Vehicle No.
                            </p>

                            <p className="mt-1 font-semibold">
                              {vehicle.vehicleNumber}
                            </p>
                          </div>

                        </div>

                        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Backend listed rate
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                              ₹
                              {Number(
                                vehicle.rentPerDay ?? 0
                              ).toLocaleString('en-IN')}
                            </p>
                          </div>

                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                          >
                            View
                          </Link>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>
            )}

        </div>
      )}

      {/* ========================================================
          OWNER BOOKINGS
      ======================================================== */}

      {role === 'owner' && section === 'bookings' && (
        <div className="mt-6">

          {/* LOADING */}

          {ownerBookingsLoading && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">

              <p className="font-medium">
                Loading owner bookings...
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Fetching booking requests from Park2Earn backend.
              </p>

            </div>
          )}

          {/* ERROR */}

          {!ownerBookingsLoading &&
            ownerBookingsError && (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive">
                {ownerBookingsError}
              </div>
            )}

          {/* EMPTY */}

          {!ownerBookingsLoading &&
            !ownerBookingsError &&
            ownerBookings.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">

                <p className="text-lg font-semibold">
                  No booking requests yet
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  New customer bookings for your vehicles will appear here.
                </p>

              </div>
            )}

          {/* BOOKINGS */}

          {!ownerBookingsLoading &&
            !ownerBookingsError &&
            ownerBookings.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-border bg-card">

                {/* HEADER */}

                <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="font-semibold">
                      Booking requests
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Manage bookings for your vehicles.
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {ownerBookings.length} booking
                    {ownerBookings.length !== 1 ? 's' : ''}
                  </span>

                </div>

                {/* BOOKING LIST */}

                <div className="divide-y divide-border">

                  {ownerBookings.map((booking) => (

                    <div
                      key={booking.id}
                      className="p-5"
                    >

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* BOOKING DETAILS */}

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="font-semibold">
                              Booking #{booking.id}
                            </h3>

                            <span
                              className={`${statusClass(
                                booking.status
                              )} rounded-full px-3 py-1 text-xs font-semibold`}
                            >
                              {booking.status}
                            </span>

                          </div>

                          <p className="mt-3 text-sm font-medium">
                            {booking.vehicleBrand}{' '}
                            {booking.vehicleModel}
                          </p>

                          <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">

                            <p>
                              <span className="font-medium text-foreground">
                                Customer:
                              </span>{' '}
                              {booking.customerName || 'Unknown customer'}
                            </p>

                            <p>
                              <span className="font-medium text-foreground">
                                Customer ID:
                              </span>{' '}
                              #{booking.customerId}
                            </p>

                            <p>
                              <span className="font-medium text-foreground">
                                Pickup:
                              </span>{' '}
                              {booking.startDate}
                            </p>

                            <p>
                              <span className="font-medium text-foreground">
                                Return:
                              </span>{' '}
                              {booking.endDate}
                            </p>

                          </div>

                        </div>

                        {/* AMOUNT + ACTIONS */}

                        <div className="shrink-0 lg:text-right">

                          <p className="text-xs text-muted-foreground">
                            Total amount
                          </p>

                          <p className="mt-1 text-xl font-semibold">
                            ₹
                            {Number(
                              booking.totalAmount ?? 0
                            ).toLocaleString('en-IN')}
                          </p>

                          {/* PENDING ACTIONS */}

                          {booking.status === 'PENDING' && (
                            <div className="mt-4 flex flex-wrap gap-2 lg:justify-end">

                              <button
                                type="button"
                                onClick={() =>
                                  handleBookingAction(
                                    booking.id,
                                    'accept'
                                  )
                                }
                                disabled={
                                  bookingActionLoading ===
                                  booking.id
                                }
                                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {bookingActionLoading ===
                                booking.id
                                  ? 'Processing...'
                                  : 'Accept'}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleBookingAction(
                                    booking.id,
                                    'reject'
                                  )
                                }
                                disabled={
                                  bookingActionLoading ===
                                  booking.id
                                }
                                className="rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {bookingActionLoading ===
                                booking.id
                                  ? 'Processing...'
                                  : 'Reject'}
                              </button>

                            </div>
                          )}

                          {/* ACCEPTED ACTION */}

                          {booking.status === 'ACCEPTED' && (
                            <div className="mt-4 flex flex-wrap gap-2 lg:justify-end">

                              <button
                                type="button"
                                onClick={() =>
                                  handleBookingAction(
                                    booking.id,
                                    'complete'
                                  )
                                }
                                disabled={
                                  bookingActionLoading ===
                                  booking.id
                                }
                                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {bookingActionLoading ===
                                booking.id
                                  ? 'Processing...'
                                  : 'Complete'}
                              </button>

                            </div>
                          )}

                          {/* COMPLETED */}

                          {booking.status === 'COMPLETED' && (
                            <p className="mt-4 text-xs font-medium text-muted-foreground">
                              This booking has been completed.
                            </p>
                          )}

                          {/* REJECTED */}

                          {booking.status === 'REJECTED' && (
                            <p className="mt-4 text-xs font-medium text-muted-foreground">
                              This booking was rejected.
                            </p>
                          )}

                          {/* CANCELLED */}

                          {booking.status === 'CANCELLED' && (
                            <p className="mt-4 text-xs font-medium text-muted-foreground">
                              This booking was cancelled.
                            </p>
                          )}

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>
            )}

        </div>
      )}

      {/* ========================================================
          OTHER PORTAL SECTIONS
      ======================================================== */}

      {!(
        (role === 'customer' &&
          (
            section === 'dashboard' ||
            section === 'wallet'
          )) ||
        (role === 'owner' &&
          (
            section === 'vehicles' ||
            section === 'bookings'
          ))
      ) && (
        <>
          {[
            'notifications',
            'earnings',
            'analytics',
          ].includes(section) ? (
            <div className="mt-6">
              <EmptyState
                title={
                  section === 'analytics'
                    ? 'No analytics data available yet.'
                    : 'No records available yet.'
                }
              />
            </div>
          ) : (
            <TableSurface
              role={role}
              section={section}
            />
          )}
        </>
      )}

    </DashboardShell>
  )
}

// ============================================================
// TABLE SURFACE
// ============================================================

function TableSurface({
  role,
  section,
}: {
  role: string
  section: string
}) {

  if (section === 'add') {
    return <VehicleForm />
  }

  if (section === 'profile') {
    return (
      <div className="max-w-2xl rounded-2xl border border-border bg-card p-6">

        <h2 className="text-xl font-semibold">
          Profile settings
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          <Field
            label="Full name"
            placeholder="Your full name"
            value=""
            onChange={() => {}}
          />

          <Field
            label="Email"
            placeholder="Your email"
            type="email"
            value=""
            onChange={() => {}}
          />

          <Field
            label="Phone"
            placeholder="Phone number"
            value=""
            onChange={() => {}}
          />

        </div>

        <button className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Save changes
        </button>

      </div>
    )
  }

  const rows =
    role === 'admin'
      ? [
          'BK-1048 · Nexon EV · Pending',
          'BK-1047 · Creta · Completed',
          'USR-103 · Owner verification',
        ]
      : role === 'owner'
        ? [
            'BK-1048 · Aditi Rao · Pending',
            'BK-1042 · Rohan Shah · Accepted',
          ]
        : [
            'BK-1048 · Nexon EV · Pending',
            'BK-1022 · Creta · Completed',
          ]

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">

      <div className="flex items-center justify-between border-b border-border p-5">

        <h2 className="font-semibold">
          {section === 'dashboard'
            ? 'Recent activity'
            : 'Records'}
        </h2>

        <button className="text-sm font-semibold text-primary">
          Export
        </button>

      </div>

      <div className="divide-y divide-border">

        {rows.map((row, i) => (
          <div
            key={row}
            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
          >

            <div>

              <p className="font-medium">
                {row}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Backend status · action availability depends on current state
              </p>

            </div>

            <span
              className={`${statusClass(
                i ? 'Completed' : 'Pending'
              )} rounded-full px-3 py-1 text-xs font-semibold`}
            >
              {i ? 'Completed' : 'Pending'}
            </span>

          </div>
        ))}

      </div>
    </div>
  )
}

// ============================================================
// VEHICLE FORM
// ============================================================

function VehicleForm() {
  const [saved, setSaved] = useState(false)

  return (
    <form
      className="max-w-3xl rounded-2xl border border-border bg-card p-6"
      onSubmit={(e) => {
        e.preventDefault()
        setSaved(true)
      }}
    >

      <h2 className="text-xl font-semibold">
        Add a vehicle
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">

        <Field
          label="Vehicle name"
          placeholder="e.g. Nexon EV"
          value=""
          onChange={() => {}}
        />

        <Field
          label="Brand"
          placeholder="Tata"
          value=""
          onChange={() => {}}
        />

        <Field
          label="Model"
          placeholder="2024"
          value=""
          onChange={() => {}}
        />

        <Field
          label="Vehicle number"
          placeholder="KA 01 AB 1234"
          value=""
          onChange={() => {}}
        />

        <Field
          label="Rate / km"
          placeholder="Provided by owner"
          value=""
          onChange={() => {}}
        />

        <Field
          label="Seats"
          placeholder="5"
          value=""
          onChange={() => {}}
        />

      </div>

      <label className="mt-4 block text-sm font-medium">
        Description

        <textarea
          className="mt-2 min-h-28 w-full rounded-xl border border-input bg-background p-3"
          placeholder="Tell customers about the vehicle"
        />
      </label>

      {saved && (
        <p className="mt-4 rounded-xl bg-accent p-3 text-sm">
          Vehicle validated. Connect the owner API to persist it.
        </p>
      )}

      <button
        type="submit"
        className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        Save vehicle
      </button>

    </form>
  )
}