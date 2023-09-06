'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { useMemo, useState } from 'react'

interface Props {
  imgSrc: string[]
}

const Photos = (props: Props) => {
  const { imgSrc } = props
  const IMAGE_LIMIT = 4
  const showPlusButton = imgSrc.length >= 5

  const cachedValue = useMemo(() => {
    return imgSrc.slice(0, IMAGE_LIMIT)
  }, [imgSrc])
  const [selectedImg, setSelectedImg] = useState<number>(0)

  const handleClick = (index: number, isLastItem: boolean) => {
    if (!(showPlusButton && isLastItem)) {
      setSelectedImg(index)
    } else {
      console.log('Consultar a UX')
    }
  }

  return (
    <section>
      <h3 className='text-xl text-blue-600'>Fotos</h3>
      <div className='ml-4 flex flex-col gap-2'>
        <div className='relative h-40 w-full'>
          <Image fill className='rounded-xl object-cover' alt='asd' src={imgSrc[selectedImg]} />
        </div>
        <div className='flex w-full gap-2'>
          {cachedValue.map((img, index) => {
            const isSelected = index === selectedImg
            const isLastItem = index === IMAGE_LIMIT - 1
            return (
              <button
                onClick={() => handleClick(index, isLastItem)}
                key={index}
                className='relative h-14 w-1/4 rounded-md '
              >
                <Image
                  fill
                  className={`rounded-md object-cover ${clsx({ 'opacity-60': !isSelected })}`}
                  alt='asd'
                  src={img}
                />
                <div
                  className={clsx(
                    { hidden: !(showPlusButton && isLastItem) },
                    'absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-60 text-5xl text-white'
                  )}
                >
                  +
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Photos
