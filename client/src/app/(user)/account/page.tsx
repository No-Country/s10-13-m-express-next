import { ConfigOptions } from '@/app/(user)/account/components'

function AccountPage() {
  return (
    <main className='flex flex-col gap-y-12 px-4 py-8'>
      <h1 className='text-3xl font-bold text-black'>Configuración</h1>
      <ConfigOptions />
    </main>
  )
}

export default AccountPage
