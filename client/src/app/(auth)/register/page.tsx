import { ArrowCircleIcon, FormInput, Submit, VisibilityOffIcon, VisibilityOnIcon } from '@/components'

const dataInputVoluntary = [
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
    icon_1: <ArrowCircleIcon />,
    key: 3
  },
  {
    type: 'mail',
    placeHolder: 'Email',
    key: 4
  },
  {
    type: 'password',
    placeHolder: 'Contraseña',
    icon_1: <VisibilityOffIcon />,
    icon_2: <VisibilityOnIcon />,
    key: 5
  },
  {
    type: 'password',
    placeHolder: 'Repetir contraseña',
    icon_1: <VisibilityOffIcon />,
    icon_2: <VisibilityOnIcon />,
    key: 6
  }
]

const dataOrgnizationInput = [
  {
    type: 'text',
    placeHolder: 'Nombre',
    key: 0
  },
  {
    type: 'text',
    placeHolder: 'Categoria',
    key: 1
  },
  {
    type: 'text',
    placeHolder: 'ubicación',
    icon_1: <ArrowCircleIcon />,
    key: 2
  },
  {
    type: 'email',
    placeHolder: 'Email',
    key: 3
  },
  {
    type: 'password',
    placeHolder: 'Contraseña',
    icon_1: <VisibilityOffIcon />,
    icon_2: <VisibilityOnIcon />,
    key: 5
  },
  {
    type: 'password',
    placeHolder: 'Repetir contraseña',
    icon_1: <VisibilityOffIcon />,
    icon_2: <VisibilityOnIcon />,
    key: 6
  }
]

function RegisterPage() {
  const selectRegister: 'organization' | 'voluntary' = 'voluntary'

  return (
    <form className='grid grid-cols-1 justify-items-center gap-8 p-6 md:grid-cols-6 md:justify-items-start md:py-20'>
      <h1 className='col-span-full self-start justify-self-start text-2xl font-bold text-pink-500'>¡Registrate!</h1>
      {selectRegister === 'voluntary'
        ? dataInputVoluntary.map((data) => (
            <FormInput
              key={data.key}
              placeHolder={data.placeHolder}
              type={data.type}
              icon_1={data.icon_1}
              icon_2={data.icon_2}
            />
          ))
        : selectRegister === 'organization' &&
          dataOrgnizationInput.map((data) => (
            <FormInput
              key={data.key}
              placeHolder={data.placeHolder}
              type={data.type}
              icon_1={data.icon_1}
              icon_2={data.icon_2}
            />
          ))}
      <Submit content='Crear cuenta' />
    </form>
  )
}

export default RegisterPage
