import { FormInput, Heading } from '@/components'
import { FormProps } from './form'
import { UseFormRegister } from 'react-hook-form'

type LocationInfoProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  formValues: FormProps
  errors: any
  register: UseFormRegister<any>
}

export default function LocationInfo({ handleChange, formValues, errors, register }: LocationInfoProps) {
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Heading as='h2'>Ubicacion</Heading>
        <hr />
      </div>
      <div className='flex grid-cols-2 flex-col gap-4 lg:grid'>
        <FormInput
          type='text'
          name='locations'
          label='Direccion'
          placeholder='Direccion'
          required={false}
          value={formValues.locations}
          onChange={handleChange}
          hookForm={{
            register: register,
            validations: {
              maxLength: { value: 10, message: 'Maximo 10 caracteres' },
              minLength: { value: 5, message: 'Minimo 5 caracteres' },
              required: { value: true, message: 'Este campo es requerido' }
            }
          }}
          error={errors?.locations?.message}
        />
      </div>
    </div>
  )
}
