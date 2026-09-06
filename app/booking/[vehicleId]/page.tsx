import { BookingPage } from '@/components/portal-pages'
export default async function Page({ params }: { params: Promise<{ vehicleId: string }> }) { const { vehicleId } = await params; return <BookingPage id={vehicleId} /> }
