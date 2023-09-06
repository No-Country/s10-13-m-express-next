import Image from 'next/image'

export default function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className='flex items-center gap-3 rounded-full  bg-pink-100 px-4 py-3'>
      <Image src='/icon/search.svg' width={16} height={16} alt='search' />
      <input
        type='text'
        placeholder={placeholder}
        className='w-full min-w-0 border-none bg-transparent placeholder:font-bold placeholder:text-gray-800 focus:outline-none'
      />
    </div>
  )
}
