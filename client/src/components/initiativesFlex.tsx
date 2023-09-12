import { InitiativeItem } from '.'
import type { InitiativeInterface } from '@/interfaces'

interface Props {
  initiatives: InitiativeInterface[]
}

export default function InitiativesFlex({ initiatives }: Props) {
  return (
    <div className='grid grid-cols-1 gap-5 p-2 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {initiatives?.map((item, index) => <InitiativeItem key={index} initiative={item} />)}
    </div>
  )
}
