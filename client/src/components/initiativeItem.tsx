'use client'
import Image from 'next/image'
import categoryIcon from '@/../public/icon/category.svg'
import starIcon from '@/../public/icon/star.svg'
import locationIcon from '@/../public/icon/location_on.svg'
import { useRouter } from 'next/navigation'

interface initiativeProps {
  id: number
  key: number
  title: string
  image: string
  location: string
  categories: string[]
  reviews: number
}

const InitiativeItem = ({ image, title, location, categories, reviews, id }: initiativeProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/initiatives/${id}`)
  }
  return (
    <article
      className=' bg-whiteSecondary flex min-h-[13.125rem] min-w-[10.375rem] flex-col gap-y-3 rounded-2xl px-3 py-4 shadow-[0px_2px_6px_0px_#B0B0B0] cursor-pointer'
      onClick={handleClick}
    >
      <Image className='aspect-video min-h-24 min-w-36 rounded-lg' src={image} alt={`Image ${title}`} width={142} height={92} />
      <div className='flex flex-col gap-2 w-36'>
        <h3 className='text-base font-bold leading-tight text-black truncate'>{title}</h3>
        <ul>
          <li className='flex gap-1'>
            <Image src={locationIcon} alt='location icon' />
            <span className='block truncate w-32'>
              {location}
            </span>
          </li>
          <li className='flex gap-1'>
            <Image src={categoryIcon} alt='category icon' />
            <span className='block truncate w-32'>
              {categories[0]}
            </span>
          </li>
          <li className='flex gap-1'>
            <Image src={starIcon} alt='star icon' />
            {reviews}
          </li>
        </ul>
      </div>
    </article>
  )
}

export default InitiativeItem
