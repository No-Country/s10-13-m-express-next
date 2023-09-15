import { SeeMore } from '@/components'

interface Props {
  description: string
}

const Description = (props: Props) => {
  const { description } = props

  return (
    <section>
      <SeeMore text={description} maxChars={35} />
    </section>
  )
}

export default Description

export const DescriptionSkeleton = () => {
  return (
    <div className='mb-6 flex flex-col gap-5'>
      <div className='h-4 w-full animate-pulse bg-gray-700' />
      <div className='h-4 w-full animate-pulse bg-gray-700' />
      <div className='h-4 w-full animate-pulse bg-gray-700' />
    </div>
  )
}
