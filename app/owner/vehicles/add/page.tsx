'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiRequest } from '@/lib/api/client'

export default function Page() {
  const router = useRouter()

  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    vehicleNumber: '',
    fuelType: 'PETROL',
    transmission: 'MANUAL',
    seats: '5',
    rentPerDay: '',
    city: '',
    address: '',
    description: '',
    imageUrl: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await apiRequest('/vehicles', {
        method: 'POST',
        body: JSON.stringify({
          brand: form.brand,
          model: form.model,
          year: Number(form.year),
          vehicleNumber: form.vehicleNumber,
          fuelType: form.fuelType,
          transmission: form.transmission,
          seats: Number(form.seats),
          rentPerDay: Number(form.rentPerDay),
          city: form.city,
          address: form.address,
          description: form.description,
          imageUrl: form.imageUrl,
        }),
      })

      setSuccess('Vehicle added successfully!')

      setTimeout(() => {
        router.push('/owner/vehicles')
      }, 1000)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to add vehicle'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-secondary/30 px-5 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">
            Owner workspace
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Add vehicle
          </h1>

          <p className="mt-2 text-muted-foreground">
            Add your vehicle to Park2Earn.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold">
                Brand
              </label>

              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Maruti"
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Model
              </label>

              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="Swift"
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Year
              </label>

              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="2024"
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Vehicle Number
              </label>

              <input
                name="vehicleNumber"
                value={form.vehicleNumber}
                onChange={handleChange}
                placeholder="MP04AB1234"
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Fuel Type
              </label>

              <select
                name="fuelType"
                value={form.fuelType}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              >
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">
                Transmission
              </label>

              <select
                name="transmission"
                value={form.transmission}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              >
                <option value="MANUAL">Manual</option>
                <option value="AUTOMATIC">Automatic</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">
                Seats
              </label>

              <input
                name="seats"
                type="number"
                value={form.seats}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Rent per day
              </label>

              <input
                name="rentPerDay"
                type="number"
                value={form.rentPerDay}
                onChange={handleChange}
                placeholder="1500"
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                City
              </label>

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Bhopal"
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Address
              </label>

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="MP Nagar, Bhopal"
                required
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
              />
            </div>

          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold">
              Image URL
            </label>

            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell customers about the vehicle"
              rows={5}
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3"
            />
          </div>

          {error && (
            <div className="mt-5 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-xl bg-accent p-4 text-sm text-accent-foreground">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? 'Adding vehicle...' : 'Add vehicle'}
          </button>

        </form>
      </div>
    </main>
  )
}