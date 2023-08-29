import { FormInput, Submit } from '@/component'

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
    <form className='grid grid-cols-1 justify-items-start gap-5 p-6'>
      <h1 className=' justify-self-center text-lg font-bold'>REGISTER</h1>
      {dataInput.map((data) => (
        <FormInput key={data.key} placeHolder={data.placeHolder} type={data.type} />
      ))}
      <Submit content='Crear cuenta' />
    </form>
  )
}

export default RegisterPage
