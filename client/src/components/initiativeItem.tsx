'use client'
import Routes from '@/utils/constants/routes.const'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  initiative: any
}

interface ItemProps {
  imageSrc: string
  text: string
  icon?: boolean
}

function Item({ imageSrc, text, icon = true }: ItemProps) {
  const textStyle = icon ? 'text-gray-800' : 'text-pink-500'
  return (
    <div className='flex gap-2'>
      {icon && <Image src={imageSrc} priority width={10} height={13} sizes='40vw' className='h-3 w-3' alt='icon' />}
      <p className={`text-xs font-normal ${textStyle}`}>{text}</p>
    </div>
  )
}

export default function InitiativeItem({ initiative }: Props) {
  return (
    <Link
      className='flex min-w-[240px] flex-col gap-2 rounded-lg p-3 shadow-initiativeItem'
      href={`${Routes.INITIATIVES}/${initiative?.id}`}
    >
      <div className='relative aspect-square h-36'>
        <Image
          src={initiative.thumbnail}
          priority
          sizes='40vw'
          fill
          alt='thumbnail'
          className='rounded-lg object-cover'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='bodyText truncate font-semibold'>{initiative.title}</h1>
        <div className='flex flex-col gap-2'>
          <Item imageSrc='' text='Playas felices' icon={false} />
          <Item imageSrc='/icon/location_on.svg' text='Villa Gesell, Argentina' />
          <Item imageSrc='/icon/category.svg' text='Medioambiente' />
          <Item imageSrc='/icon/family_link.svg' text='Actividades Ecológicas' />
          <Item imageSrc='/icon/star.svg' text='4.5' />
        </div>
      </div>
    </Link>
  )
}
