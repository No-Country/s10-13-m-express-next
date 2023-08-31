import HeroSec from './components/hero'
import InfoSec from './components/info'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciativa Individual',
  description: '...',
  themeColor: '#000000'
}

function InitiativesPage() {
  return (
    <main className='flex flex-col gap-10 py-7'>
      <HeroSec />
      <InfoSec />
    </main>
  )
}

export default InitiativesPage
