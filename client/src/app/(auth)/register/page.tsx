import { FormInput, Submit } from '@/components'

const dataInput = [
  {
    type: 'text',
    placeHolder: 'Nombre',
    key: 0
  },
  {
    type: 'text',
    placeHolder: 'Apellido',
    key: 1
  },
  {
    type: 'date',
    placeHolder: 'Fecha de nacimiento',
    key: 2
  },
  {
    type: 'text',
    placeHolder: 'Ubicación',
    key: 3
  },
  {
    type: 'mail',
    placeHolder: 'correo electrónico',
    key: 4
  },
  {
    type: 'password',
    placeHolder: 'Contraseña',
    key: 5
  },
  {
    type: 'password',
    placeHolder: 'Repetir contraseña',
    key: 6
  }
]

function RegisterPage() {
  return (
    <form className='grid grid-cols-1 justify-items-center gap-8 p-6 md:grid-cols-6 md:justify-items-start md:py-20'>
      <h1 className='col-span-full justify-self-center text-lg font-bold'>REGISTER</h1>
      {dataInput.map((data) => (
        <FormInput key={data.key} name='' label='' placeholder={data.placeHolder} type={data.type} />
      ))}
      <Submit content='Crear cuenta' />
    </form>
  )
}

export default RegisterPage
