'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  title: string
  image: string
  location: string
  minWidth?: string
}

export default function InitiativeItem({ title, image, location, minWidth = '' }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push('/initiatives/1')
  }

  return (
    <div className={`${minWidth} flex w-full cursor-pointer flex-col`} onClick={handleClick}>
      <div className='flex w-full flex-col gap-2 '>
        <div className='l relative aspect-[1/1]  w-full'>
          <Image src={image} fill alt='Vercel Logo' className='aspect-[3/4] rounded-2xl object-cover' />
        </div>
        <div className='flex flex-col gap-2'>
          <div>
            <h1 className='bodyText font-medium'>{title}</h1>
            <p className='text-sm font-light'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque dictum commodo. Curabitur purus
              quam
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
