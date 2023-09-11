import { UnstyledSelect } from '@/components'
import { countries } from '@/services/mock/locations.service'

interface Props {
  handleChange: (name: string, value: any) => void
}

export default function Selects(props: Props) {
  const { handleChange } = props
  return (
    <>
      <UnstyledSelect
        name='country'
        label='Pais de iniciativa'
        setSelected={(selected) => {
          handleChange('country', selected)
        }}
        names={countries}
        placeholder='Selecciona una opción'
      />
    </>
  )
}
