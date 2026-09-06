import { VehicleDetailPage } from '@/components/portal-pages'
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <VehicleDetailPage id={id} /> }
