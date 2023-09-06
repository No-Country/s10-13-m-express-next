import { Button, FormInput } from '@/components'

function ConsultForm() {
  return (
    <form className='grid gap-y-5'>
      <FormInput type='text' placeholder='Nombre' name='name' />
      <FormInput type='email' placeholder='Email' name='surname' />
      <FormInput type='textarea' placeholder='Escribe tu consulta...' name='consultation' />
      <Button align='center'>Enviar</Button>
    </form>
  )
}

export default ConsultForm
