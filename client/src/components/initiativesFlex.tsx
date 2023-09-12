import type { InitiativeInterface } from '@/interfaces'
import { InitiativeItem } from '.'

interface Props {
  initiatives: InitiativeInterface[]
}

function InitiativesFlex({ initiatives }: Props) {
  return (
    <div className='flex gap-5 overflow-x-scroll p-4'>
      {initiatives?.map((item, index) => <InitiativeItem key={index} initiative={item} />)}
    </div>
  )
}

export default InitiativesFlex
