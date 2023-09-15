import Image from 'next/image'

interface Props {
  imgUrls: string[]
}

const Volunteers = (props: Props) => {
  const { imgUrls } = props

  return (
    <section className='mb-6'>
      <h3 className='mb-3 text-xl text-blue-600'>Voluntarios</h3>
      <ul className='flex flex-wrap gap-4'>
        {imgUrls.map((url, index) => (
          <li key={index} className='relative h-10 w-10'>
            <Image className='rounded-full object-cover' fill src={url} alt='profile photo' />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Volunteers

export const VolunteersSkeleton = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} className='h-10 w-10 animate-pulse rounded-full bg-gray-700' />
      ))}
    </div>
  )
}
