import Image from 'next/image'

export default function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className='flex items-center gap-2 rounded-full border border-blue-500 bg-white px-3 py-2'>
      <Image src='/icon/example.svg' width={20} height={20} alt='example' />
      <input type='text' placeholder={placeholder} className='w-full min-w-0 border-none focus:outline-none' />
    </div>
  )
}
