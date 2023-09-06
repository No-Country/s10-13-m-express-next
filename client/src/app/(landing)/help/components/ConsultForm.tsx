/*
  1. Reemplazar inputs estaticos por componentes Input de la pagina login y register
*/

import { Button } from '@/components'

function ConsultForm() {
  return (
    <form className='grid gap-y-5'>
      <input
        type='text'
        className='block w-full rounded border border-gray-700 bg-transparent px-3 py-4 text-sm text-gray-900 placeholder:text-black'
        placeholder='Nombre'
      />
      <input
        type='email'
        className='block w-full rounded border border-gray-700 bg-transparent px-3 py-4 text-sm text-gray-900 placeholder:text-black'
        placeholder='Email'
      />
      <textarea
        className='block w-full rounded border border-gray-700 bg-transparent px-3 py-4 text-sm text-gray-900 placeholder:text-black'
        placeholder='Escribe tu consulta...'
        rows={6}
      />
      <Button align='center'>Enviar</Button>
    </form>
  )
}

export default ConsultForm
