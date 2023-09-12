'use client'
import { InitiativeInterface } from '@/interfaces'
import Routes from '@/utils/constants/routes.const'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  initiative: InitiativeInterface
  minWidth?: string
}

interface ItemProps {
  imageSrc: string
  text: string | null
  icon?: boolean
}

function Item({ imageSrc, text, icon = true }: ItemProps) {
  const textStyle = icon ? 'text-gray-800' : 'text-pink-500'
  return (
    <div className='flex gap-2'>
      {icon && <Image src={imageSrc} width={10} height={13} alt='icon' />}
      <p className={`text-xs font-normal ${textStyle}`}>{text}</p>
    </div>
  )
}

export default function InitiativeItem({ initiative, minWidth = '' }: Props) {
  return (
    <Link href={`${Routes.INITIATIVES}/${initiative?.id}`}>
      <div className={`${minWidth} h-full flex w-full cursor-pointer flex-col rounded-lg shadow-initiativeItem`}>
        <div className='flex w-full flex-col gap-2 p-3 '>
          <div className='l relative aspect-[1/1]  w-full'>
            <Image src={initiative.thumbnail} fill alt='thumbnail' className='aspect-[3/4] rounded-lg object-cover' />
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='bodyText font-semibold'>{initiative.title}</h1>
            <div className='flex flex-col gap-2'>
              <Item imageSrc='' text={initiative.owner?.orgName} icon={false} />
              <Item imageSrc='/icon/location_on.svg' text={initiative.country + ', ' + initiative.province} />
              <Item imageSrc='/icon/category.svg' text={initiative.opportunities.join(', ')} />
              <Item imageSrc='/icon/family_link.svg' text={initiative.themes.join(', ')} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
