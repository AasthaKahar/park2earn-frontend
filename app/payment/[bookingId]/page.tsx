'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, Check, CreditCard } from 'lucide-react'

import { PublicHeader } from '@/components/app-shell'
import { apiRequest } from '@/lib/api/client'

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

type Payment = {
  id: number
  bookingId: number
  amount: number
  status: string
  paymentDate: string
}

export default function Page({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  const [bookingId, setBookingId] = useState('')

  const [booking, setBooking] =
    useState<Booking | null>(null)

  const [payment, setPayment] =
    useState<Payment | null>(null)

  const [walletBalance, setWalletBalance] =
    useState<number | null>(null)

  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Get bookingId from URL
  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params
      setBookingId(resolvedParams.bookingId)
    }

    getParams()
  }, [params])

  // Load booking + wallet + existing payment
  useEffect(() => {
    if (!bookingId) return

    async function loadPaymentData() {
      try {
        setLoading(true)
        setError('')

        const [bookingData, walletData, paymentData] =
          await Promise.all([
            apiRequest(`/bookings/${bookingId}`),
            apiRequest('/wallet/balance'),
            apiRequest(
              `/payments/booking/${bookingId}`
            ),
          ])

        setBooking(bookingData)

        setWalletBalance(
          typeof walletData === 'number'
            ? walletData
            : Number(walletData ?? 0)
        )

        setPayment(paymentData)
      } catch (err) {
        // Payment may not exist yet.
        // So booking + wallet are loaded separately below.
        try {
          const [bookingData, walletData] =
            await Promise.all([
              apiRequest(`/bookings/${bookingId}`),
              apiRequest('/wallet/balance'),
            ])

          setBooking(bookingData)

          setWalletBalance(
            typeof walletData === 'number'
              ? walletData
              : Number(walletData ?? 0)
          )

          setPayment(null)
          setError('')
        } catch (innerErr) {
          setError(
            innerErr instanceof Error
              ? innerErr.message
              : 'Unable to load payment details'
          )
        }
      } finally {
        setLoading(false)
      }
    }

    loadPaymentData()
  }, [bookingId])

  async function makePayment() {
    if (!bookingId) {
      setError('Booking ID is missing.')
      return
    }

    try {
      setProcessing(true)
      setError('')
      setSuccess('')

      const data = await apiRequest(
        `/payments/${bookingId}`,
        {
          method: 'POST',
        }
      )

      setPayment(data)

      setSuccess(
        `Payment of ₹${data.amount?.toLocaleString(
          'en-IN'
        )} was successful.`
      )

      // Refresh wallet balance
      try {
        const balance = await apiRequest(
          '/wallet/balance'
        )

        setWalletBalance(
          typeof balance === 'number'
            ? balance
            : Number(balance ?? 0)
        )
      } catch {
        // Payment already succeeded.
      }

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Payment failed'
      )
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div>
        <PublicHeader />

        <main className="mx-auto max-w-3xl px-5 py-14">

          <div className="rounded-2xl border border-border bg-card p-8 text-center">

            <p className="font-medium">
              Loading payment details...
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Fetching booking and wallet information.
            </p>

          </div>

        </main>
      </div>
    )
  }

  if (!booking) {
    return (
      <div>
        <PublicHeader />

        <main className="mx-auto max-w-3xl px-5 py-14">

          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
            {error || 'Booking not found.'}
          </div>

          <Link
            href="/customer/bookings"
            className="mt-5 inline-flex items-center font-semibold text-primary"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to bookings
          </Link>

        </main>
      </div>
    )
  }

  const amount = payment?.amount ?? booking.totalAmount ?? 0

  const alreadyPaid =
    payment?.status === 'SUCCESS' ||
    payment?.status === 'PAID'

  return (
    <div>

      <PublicHeader />

      <main className="mx-auto max-w-3xl px-5 py-14">

        <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">
          Secure payment
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Complete your booking
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Booking #{booking.id} ·{' '}
          {booking.vehicleBrand} {booking.vehicleModel}
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">

          {/* HEADER */}

          <div className="flex items-center gap-4">

            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CreditCard />
            </span>

            <div>

              <p className="font-semibold">
                Booking payment
              </p>

              <p className="text-sm text-muted-foreground">
                Amount and status provided by the backend
              </p>

            </div>

          </div>

          {/* DETAILS */}

          <div className="mt-7 space-y-3 border-t border-border pt-5 text-sm">

            <p className="flex justify-between gap-4">

              <span className="text-muted-foreground">
                Booking ID
              </span>

              <strong>
                #{booking.id}
              </strong>

            </p>

            <p className="flex justify-between gap-4">

              <span className="text-muted-foreground">
                Vehicle
              </span>

              <strong>
                {booking.vehicleBrand}{' '}
                {booking.vehicleModel}
              </strong>

            </p>

            <p className="flex justify-between gap-4">

              <span className="text-muted-foreground">
                Pickup
              </span>

              <strong>
                {booking.startDate}
              </strong>

            </p>

            <p className="flex justify-between gap-4">

              <span className="text-muted-foreground">
                Return
              </span>

              <strong>
                {booking.endDate}
              </strong>

            </p>

            <p className="flex justify-between gap-4">

              <span className="text-muted-foreground">
                Booking status
              </span>

              <strong>
                {booking.status}
              </strong>

            </p>

          </div>

          {/* AMOUNT */}

          <div className="mt-6 rounded-xl bg-secondary p-5">

            <p className="text-sm text-muted-foreground">
              Amount to pay
            </p>

            <p className="mt-2 text-3xl font-semibold">
              ₹{amount.toLocaleString('en-IN')}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              Final amount provided by the Park2Earn backend.
            </p>

          </div>

          {/* WALLET */}

          <div className="mt-4 rounded-xl border border-border p-5">

            <p className="text-sm text-muted-foreground">
              Wallet balance
            </p>

            <p className="mt-2 text-xl font-semibold">
              ₹
              {(walletBalance ?? 0).toLocaleString(
                'en-IN'
              )}
            </p>

            {walletBalance !== null &&
              walletBalance < amount && (
                <p className="mt-2 text-sm text-destructive">
                  Insufficient wallet balance for this payment.
                </p>
              )}

          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="mt-5 rounded-xl bg-accent p-4 text-sm text-accent-foreground">
              <Check className="mr-2 inline size-4" />
              {success}
            </div>
          )}

          {/* PAYMENT BUTTON */}

          {alreadyPaid ? (

            <Link
              href="/payment/success"
              className="mt-7 flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground"
            >
              <Check className="mr-2 size-4" />
              Payment already completed
            </Link>

          ) : (

            <button
              onClick={makePayment}
              disabled={
                processing ||
                (walletBalance !== null &&
                  walletBalance < amount)
              }
              className="mt-7 w-full rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processing
                ? 'Processing payment...'
                : `Pay ₹${amount.toLocaleString('en-IN')}`}
            </button>

          )}

          {/* SUCCESS RECEIPT */}

          {success && (
            <Link
              href="/payment/success"
              className="mt-4 block text-center text-sm font-semibold text-primary"
            >
              View receipt →
            </Link>
          )}

        </div>

      </main>

    </div>
  )
}