import Image from 'next/image'
const numCards = 10
const Volunteer = () => {
  return (
    <div className='container px-4 flex-grow w-full py-4 sm:py-16 mx-auto'>
      <h1 className='text-left text-3xl mb-4 bg-white font-bold text-gray-800 mx-auto px-2'>
        Mis voluntariados
      </h1>
      <div className='mx-auto w-full md:w-4/5 px-4'>
        <div className='flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8'>
          {Array.from({ length: numCards }).map((_, index) => (
            <div key={index} className='flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg'>
              <a href='#' className='space-y-4'>
                <div className='aspect-w-16 aspect-h-9'>
                  <Image
                    className='object-cover shadow-md hover:shadow-xl rounded-lg w-full'
                    width={200} height={100}
                    src='https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixqx=3H1AJd0Pae&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
                    alt='img-my-voluteers'
                  />
                </div>
                <div className='px-4 py-2'>
                  <div className='text-lg leading-6 font-medium space-y-1'>
                    <h3 className='font-bold text-gray-800 text-md mb-2'>
                      Titulo
                    </h3>
                  </div>
                  <div className='text-lg'>
                    <p>
                      Nombre de organizacion
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Volunteer
