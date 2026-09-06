'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  ChevronDown,
  CircleHelp,
  Clock3,
  Fuel,
  Gauge,
  Globe2,
  Menu,
  Navigation,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
} from 'lucide-react'

const vehicles = [
  {
    name: 'Tata Nexon EV',
    meta: '2024 • Automatic • 5 seats',
    location: 'Indiranagar, Bengaluru',
    rate: '₹10.8 / km',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=85',
    accent: 'Electric',
  },
  {
    name: 'Hyundai Creta',
    meta: '2023 • Automatic • 5 seats',
    location: 'Hitech City, Hyderabad',
    rate: '₹12.5 / km',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85',
    accent: 'Popular',
  },
  {
    name: 'Mahindra Thar',
    meta: '2022 • Manual • 4 seats',
    location: 'Koramangala, Bengaluru',
    rate: '₹15.2 / km',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=85',
    accent: 'Adventure',
  },
]

const faqs = [
  ['How does Park2Earn pricing work?', 'Your trip estimate is built around distance and usage, not a flat daily rental. The final amount is calculated by our backend after your trip details are confirmed.'],
  ['Who can list a vehicle?', 'Any verified owner with a road-legal, insured vehicle can apply to list it. You stay in control of availability and booking requests.'],
  ['Is every vehicle verified?', 'Yes. We review vehicle documents, owner identity, and safety information before a vehicle becomes bookable.'],
]

export function Park2EarnHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [location, setLocation] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Park2Earn home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"><CarFront className="size-5" /></span>
            <span className="text-lg font-semibold tracking-tight">Park<span className="text-primary">2</span>Earn</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 lg:flex">
            <a href="#explore" className="transition-colors hover:text-primary">Explore Vehicles</a>
            <a href="#how-it-works" className="transition-colors hover:text-primary">How It Works</a>
            <a href="#owners" className="transition-colors hover:text-primary">List Your Vehicle</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="rounded-full px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary">Login</Link>
            <Link href="/register" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5">Get started <ArrowRight className="ml-1 inline size-4" /></Link>
          </div>
          <button type="button" className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="border-t border-border bg-background/95 px-5 py-5 backdrop-blur-lg lg:hidden"><div className="flex flex-col gap-4 text-sm font-medium"><a href="#explore" onClick={() => setMenuOpen(false)}>Explore Vehicles</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a><a href="#owners" onClick={() => setMenuOpen(false)}>List Your Vehicle</a><Link href="/login">Login</Link><Link href="/register" className="rounded-full bg-primary px-4 py-3 text-center text-primary-foreground">Get started</Link></div></div>}
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div className="relative z-10 max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary"><Sparkles className="size-3.5" /> The smarter way to move</div>
              <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[5.2rem]">Your car shouldn&apos;t sit idle.<span className="text-primary"> Make it earn.</span></h1>
              <p className="mt-7 max-w-md text-pretty text-lg leading-8 text-muted-foreground">Rent smarter or turn your parked vehicle into income with a trusted community built around every journey.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Link href="#explore" className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-transform hover:-translate-y-0.5">Find a vehicle <ArrowRight className="ml-1 inline size-4" /></Link><Link href="#owners" className="rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">List your vehicle</Link></div>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"><div className="flex -space-x-2"><span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-emerald-200 text-xs font-bold text-emerald-900">A</span><span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-amber-200 text-xs font-bold text-amber-900">R</span><span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-sky-200 text-xs font-bold text-sky-900">S</span></div><span><strong className="text-foreground">4.9/5</strong> from early members</span></div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-3xl" />
              <div className="relative aspect-[1.08/1] overflow-hidden rounded-[2rem] bg-secondary shadow-2xl shadow-primary/10"><img src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=90" alt="A premium SUV driving through a sunlit mountain road" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><div><p className="text-xs uppercase tracking-[0.2em] text-white/70">Built for the journey</p><p className="mt-1 text-2xl font-medium tracking-tight">Go further, together.</p></div><span className="flex size-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-md"><ArrowRight className="size-5 -rotate-45" /></span></div></div>
              <div className="absolute -bottom-7 -left-5 hidden w-52 rounded-2xl border border-white/70 bg-card/95 p-4 shadow-xl backdrop-blur-md sm:block"><div className="flex items-center gap-2 text-xs font-semibold text-primary"><span className="size-2 rounded-full bg-primary" /> Live availability</div><p className="mt-3 text-2xl font-semibold tracking-tight">2,400<span className="text-sm font-normal text-muted-foreground">+ vehicles</span></p><p className="mt-1 text-xs text-muted-foreground">ready across India</p></div>
            </div>
          </div>
          <form onSubmit={submitSearch} className="relative z-20 mx-auto mt-16 max-w-5xl rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-foreground/5 lg:-mb-16"><div className="grid gap-1 lg:grid-cols-[1.35fr_1fr_1fr_0.9fr_auto]"><label className="flex items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-secondary"><Navigation className="size-4 text-primary" /><span className="flex-1"><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Where</span><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or neighbourhood" className="mt-1 w-full bg-transparent text-sm font-medium outline-none placeholder:text-foreground/60" /></span></label><label className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-secondary"><Clock3 className="size-4 text-primary" /><span><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Pick up</span><span className="mt-1 block text-sm font-medium">Today, 10:00 AM</span></span></label><label className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-secondary"><Clock3 className="size-4 text-primary" /><span><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Return</span><span className="mt-1 block text-sm font-medium">Tomorrow, 10:00 AM</span></span></label><label className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-secondary"><CarFront className="size-4 text-primary" /><span><span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Vehicle</span><span className="mt-1 block text-sm font-medium">Any type</span></span></label><button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"><Search className="size-4" /> <span className="lg:hidden">Search</span></button></div>{submitted && <p className="px-4 pb-2 pt-2 text-xs font-medium text-primary">{location ? `Showing vehicles near ${location}.` : 'Tell us where you are headed to find available vehicles.'}</p>}</form>
        </section>

        <section className="border-y border-border bg-card px-5 py-7 lg:px-8"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5 text-sm text-muted-foreground"><div className="flex items-center gap-3"><ShieldCheck className="size-5 text-primary" /><span><strong className="text-foreground">Verified</strong> vehicles & owners</span></div><div className="flex items-center gap-3"><Navigation className="size-5 text-primary" /><span><strong className="text-foreground">12+ cities</strong> and growing</span></div><div className="flex items-center gap-3"><BadgeCheck className="size-5 text-primary" /><span><strong className="text-foreground">Protected</strong> every trip</span></div><div className="flex items-center gap-3"><WalletCards className="size-5 text-primary" /><span><strong className="text-foreground">Usage-based</strong> pricing</span></div></div></section>

        <section id="how-it-works" className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Simple by design</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">More freedom in three easy moves.</h2></div><div className="mt-14 grid gap-4 md:grid-cols-3"><Step number="01" icon={<Search />} title="Find your ride" text="Search verified vehicles by location, type, and availability. Your next plan starts here." /><Step number="02" icon={<Navigation />} title="Book your journey" text="Share your pickup and destination. See an estimate built around your actual usage." /><Step number="03" icon={<Sparkles />} title="Go your own way" text="Unlock a better way to move, while owners make more from what they already have." /></div></div></section>

        <section id="explore" className="bg-secondary/60 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Made for the moment</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A ride for wherever<br className="hidden sm:block" /> you&apos;re going.</h2></div><Link href="/vehicles" className="text-sm font-semibold text-primary hover:underline">Explore all vehicles <ArrowRight className="ml-1 inline size-4" /></Link></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{vehicles.map((vehicle) => <VehicleCard key={vehicle.name} vehicle={vehicle} />)}</div></div></section>

        <section id="owners" className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2"><div className="overflow-hidden rounded-[2rem] bg-primary"><img src="https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=85" alt="Car owner handing keys to a customer" className="aspect-[1.1/1] w-full object-cover mix-blend-luminosity opacity-85" /></div><div className="max-w-lg"><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">For owners</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Your parked car has a second life.</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">List when it suits you, approve the journeys you like, and earn from a vehicle that already lives in your driveway.</p><div className="mt-8 space-y-5"><Benefit title="You stay in control" text="Set your availability and review every booking request." /><Benefit title="Clearer earning picture" text="See booking-wise estimates, usage, and payment status." /><Benefit title="A community you can trust" text="Every customer and vehicle goes through verification." /></div><Link href="/register?role=OWNER" className="mt-9 inline-flex rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">Start earning <ArrowRight className="ml-2 size-4" /></Link></div></div></section>

        <section className="bg-[#173d34] px-5 py-24 text-[#f4f2ea] lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b4d7c0]">Trust on every trip</p><h2 className="mt-4 max-w-lg text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">The road feels better when you know who&apos;s on it.</h2><p className="mt-6 max-w-md leading-7 text-[#c7ddd1]">From vehicle documents to trip protection, every part of Park2Earn is designed to make shared mobility feel personal and dependable.</p></div><div className="grid gap-4 sm:grid-cols-2"><TrustCard icon={<ShieldCheck />} title="Verified by design" text="Identity, documents, and vehicle details are checked before a trip." /><TrustCard icon={<Globe2 />} title="Built for local roads" text="Discover trusted vehicles in neighbourhoods you already know." /><TrustCard icon={<Users />} title="People first" text="Clear communication and support from booking to return." /><TrustCard icon={<Gauge />} title="Fairer by usage" text="Estimates reflect the journey you actually take." /></div></div></section>

        <section className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between gap-6"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">From the community</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Good journeys, shared.</h2></div><div className="hidden items-center gap-1 text-sm font-medium sm:flex"><Star className="size-4 fill-primary text-primary" /> 4.9 average rating</div></div><div className="mt-12 grid gap-5 md:grid-cols-3"><Quote text="The estimate felt honest because it was tied to my actual route. Pick-up was effortless too." name="Ananya Rao" detail="Customer • Bengaluru" /><Quote text="I love that I decide when my car is available. The dashboard makes every booking easy to follow." name="Vikram Mehta" detail="Owner • Hyderabad" /><Quote text="A beautifully simple way to get around the city without committing to owning another car." name="Rohan Shah" detail="Customer • Mumbai" /></div></div></section>

        <section className="bg-secondary/60 px-5 py-24 lg:px-8"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Questions, answered</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Before you hit the road.</h2><p className="mt-5 leading-7 text-muted-foreground">Still curious? Our support team is a message away.</p><Link href="/login" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">Visit support <ArrowRight className="size-4" /></Link></div><div className="divide-y divide-border rounded-2xl border border-border bg-card px-6">{faqs.map(([question, answer], index) => <div key={question} className="py-5"><button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left font-semibold"><span>{question}</span><ChevronDown className={`size-4 shrink-0 text-primary transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} /></button>{activeFaq === index && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{answer}</p>}</div>)}</div></div></section>

        <section className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-7 py-14 text-primary-foreground sm:px-14 lg:flex lg:items-center lg:justify-between lg:py-16"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/65">Your next move</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">The best trips start with a little more freedom.</h2></div><Link href="/vehicles" className="mt-9 inline-flex shrink-0 items-center rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 lg:mt-0">Find a vehicle <ArrowRight className="ml-2 size-4" /></Link></div></section>
      </main>

      <footer className="border-t border-border px-5 py-12 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 sm:flex-row"><div><Link href="/" className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><CarFront className="size-4" /></span><span className="font-semibold">Park<span className="text-primary">2</span>Earn</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">A better way to move, and a smarter way to make your vehicle work for you.</p></div><div className="grid grid-cols-2 gap-x-16 gap-y-8 text-sm sm:grid-cols-3"><FooterColumn title="Explore" links={['Vehicles', 'How it works', 'Safety']} /><FooterColumn title="For owners" links={['List your vehicle', 'Owner dashboard', 'Earnings']} /><FooterColumn title="Company" links={['About us', 'Support', 'Contact']} /></div></div><div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row"><span>© 2025 Park2Earn. Demo experience for product preview.</span><div className="flex gap-5"><span>Terms</span><span>Privacy</span><span>Instagram</span><span>LinkedIn</span></div></div></div></footer>
    </div>
  )
}

function Step({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-2xl border border-border bg-card p-7 transition-transform hover:-translate-y-1"><div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</span><span className="text-sm font-bold text-muted-foreground/50">{number}</span></div><h3 className="mt-9 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></div> }
function VehicleCard({ vehicle }: { vehicle: (typeof vehicles)[number] }) { return <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[1.25/0.85] overflow-hidden"><img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur-sm">{vehicle.accent}</span><button type="button" aria-label={`Save ${vehicle.name}`} className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm"><Star className="size-4" /></button></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold tracking-tight">{vehicle.name}</h3><p className="mt-1 text-xs text-muted-foreground">{vehicle.meta}</p></div><span className="flex items-center gap-1 text-xs font-semibold"><Star className="size-3.5 fill-primary text-primary" /> 4.9</span></div><p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><Navigation className="size-3.5 text-primary" /> {vehicle.location}</p><div className="mt-5 flex items-end justify-between border-t border-border pt-4"><div><span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Estimated trip cost</span><span className="mt-1 block text-sm font-semibold">{vehicle.rate} <span className="font-normal text-muted-foreground">based on usage</span></span></div><Link href="/vehicles" className="text-xs font-bold text-primary">View details <ArrowRight className="ml-1 inline size-3" /></Link></div></div></article> }
function Benefit({ title, text }: { title: string; text: string }) { return <div className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" /><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div> }
function TrustCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5"><span className="text-[#b4d7c0]">{icon}</span><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#b8d0c4]">{text}</p></div> }
function Quote({ text, name, detail }: { text: string; name: string; detail: string }) { return <blockquote className="rounded-2xl border border-border bg-card p-7"><div className="flex gap-1 text-primary"><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /></div><p className="mt-6 text-lg leading-8 tracking-tight">&quot;{text}&quot;</p><footer className="mt-7 border-t border-border pt-5"><p className="text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></footer></blockquote> }
function FooterColumn({ title, links }: { title: string; links: string[] }) { return <div><h3 className="font-semibold">{title}</h3><ul className="mt-4 space-y-3 text-muted-foreground">{links.map((link) => <li key={link}><a href="#" className="transition-colors hover:text-primary">{link}</a></li>)}</ul></div> }
export { CircleHelp, Fuel }

