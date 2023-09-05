import { ConfigOptions } from '@/app/(user)/account/components'
import { Heading } from '@/components'

function AccountPage() {
  return (
    <main className='flex flex-col gap-y-12 p-section'>
      <Heading>Configuración</Heading>
      <ConfigOptions />
    </main>
  )
}

export default AccountPage
