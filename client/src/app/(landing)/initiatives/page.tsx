import SearchSection from './components/search'
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
    <main className='gap-main p-section'>
      <SearchSection />
      <FeaturedSec />
      <RecentSec />
    </main>
  )
}

export default InitiativesPage
