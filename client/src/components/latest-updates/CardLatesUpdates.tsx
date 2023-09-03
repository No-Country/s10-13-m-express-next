import Image from 'next/image'
const numCards = 5
function CardLastesUpdates() {
  return (
    <div>
      {Array.from({ length: numCards }).map((_, index) => (
        <div key={index} className='max-w-2xl overflow-hidden rounded-lg bg-white shadow-md'>
          <div className='mt-4'>
            <div className='flex items-center py-3'>
              <div className='flex items-center'>
                <Image
                  className=' h-10 rounded-full'
                  src='https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60'
                  width={40}
                  height={40}
                  alt='Avatar'
                />
                <a href='#' className='mx-2 font-semibold text-gray-700 '>
                  {' '}
                  Nombre de la organización
                </a>
              </div>
              <span className='mx-1 text-xs text-gray-600 '>Nombre de la iniciativa</span>
            </div>
          </div>
          <Image
            className='h-64 w-full rounded-md object-cover'
            src='https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            alt='img-lastes-updates'
            width={300}
            height={200}
          />
          <div className='p-6'>
            <div>
              <p className='mt-2 text-sm text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel.
                Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada
                lobortis.
              </p>
              <p className='mt-2 text-sm font-medium text-indigo-600'>
                Ver más <span className='text-indigo-600' />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default CardLastesUpdates
