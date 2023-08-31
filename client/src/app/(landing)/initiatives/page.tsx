import HeroSec from './components/hero'
import FeaturedSec from './components/featured'
import RecentSec from './components/recent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciativas',
  description: '...',
  themeColor: '#000000'
}

function InitiativesPage() {
  return (
    <main className='flex flex-col gap-10 py-7 bg-white'>
      <HeroSec />
      <FeaturedSec />
      <RecentSec />
    </main>
  )
}

export default InitiativesPage
