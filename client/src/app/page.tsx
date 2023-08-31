import HeroSec from './components/hero'
import PromoSec from './components/promo'
import InitiativesSec from './components/initiatives'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
  themeColor: '#000000'
}

function Home() {
  return (
    <main className='flex flex-col items-start gap-10 py-7'>
      <HeroSec />
      <PromoSec />
      <InitiativesSec />
    </main>
  )
}

export default Home
