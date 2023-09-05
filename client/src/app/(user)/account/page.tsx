import { ConfigOptions } from '@/app/(user)/account/components'
import { Heading } from '@/components'

function AccountPage() {
  return (
    <main className='flex flex-col gap-y-12 px-4 py-8'>
      <Heading>Configuración</Heading>
      <ConfigOptions />
    </main>
  )
}

export default AccountPage
