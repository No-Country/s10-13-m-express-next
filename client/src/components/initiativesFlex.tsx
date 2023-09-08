import { InitiativeItem } from '.'
import type { InitiativeInterface } from '@/interfaces'

interface Props {
  initiatives: InitiativeInterface[]
}

export default function InitiativesFlex({ initiatives }: Props) {
  return (
    <div className='flex  gap-5 overflow-y-scroll p-2 pb-6'>
      {initiatives?.map((item, index) => (
        <InitiativeItem key={index} initiative={item} minWidth='min-w-[65vw] md:min-w-[35vw] lg:min-w-[0] ' />
      ))}
    </div>
  )
}
