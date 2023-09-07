import { InitiativeItem } from '.'

type Props = {
  initiatives: any
}

export default function InitiativesFlex({ initiatives }: Props) {
  return (
    <div className='flex  gap-5 overflow-y-scroll p-2 pb-6'>
      {initiatives?.map((item: any) => (
        <InitiativeItem
          initiative={item}
          minWidth='min-w-[65vw] md:min-w-[35vw] lg:min-w-[0] '
        />
      ))}
    </div>
  )
}
