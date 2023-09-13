import type { Metadata } from 'next'
import HeroSec from './components/hero'
import InitiativesSec from './components/initiatives'
import PromoSec from './components/promo'

export const metadata: Metadata = {
  title: 'Home',
  description: '...',
  themeColor: '#000000'
}

function Home() {
  return (
    <main className='flex flex-col items-center gap-y-10 p-4'>
      <article className='2xl:container gap-y-10 grid'>
        <HeroSec />
        <PromoSec />
        <InitiativesSec />
      </article>
    </main>
  )
}

export default Home
