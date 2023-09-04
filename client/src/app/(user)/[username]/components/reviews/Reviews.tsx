import Image from 'next/image'

const Reviews = () => {
  return (
    <div className='inline-flex h-[680px] w-full flex-col items-start justify-start gap-5 rounded-xl bg-pink-100 px-4 py-2.5'>
      <div className='inline-flex items-start justify-start gap-2.5'>
        <h1 className='text-base font-bold leading-tight text-blue-700'>Reseñas</h1>
      </div>
      <div className='flex h-[130px] flex-col rounded-xl bg-white px-4 py-3 shadow'>
        <div className='inline-flex flex-col items-start justify-start'>
          <div className='inline-flex h-5 items-center justify-start gap-3'>
            <Image
              width={30}
              height={30}
              className='rounded-full'
              src='https://via.placeholder.com/24x24'
              alt='avatar-review'
            />
            <div className='text-base font-semibold leading-tight text-pink-600'>Micaela Torres</div>
          </div>
          <div className='inline-flex items-center justify-center px-2 py-3'>
            <p className='whitespace-pre-wrap text-xs font-normal text-black'>
              Disfruté mucho de ser parte de esta iniciativa. Es de las mejores escuelas de surf para niños en las que
              participé y la recomiendo mucho
            </p>
          </div>
          <div className='flex flex-col items-end justify-center'>
            <h1 className='text-right text-sm font-bold leading-none text-blue-500'>Ver más</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reviews
