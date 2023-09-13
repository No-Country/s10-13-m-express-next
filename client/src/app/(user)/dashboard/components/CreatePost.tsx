import Image from 'next/image'

const iniciativas = [
  {
    id: 1,
    name: 'Ayudantes para la playa'
  },
  {
    id: 2,
    name: 'Ayudantes para la playa 2'
  },
  {
    id: 3,
    name: 'Ayudantes para la playa 3'
  }
]

const Createpost = () => {
  return (
    <>
      <h2 className='text-xl font-medium text-blue-600'>Createpost</h2>
      <form className='bg-gray-75 flex flex-col gap-3 rounded-xl px-3 py-4'>
        <header className='flex justify-between'>
          <Image
            src='/image/user-icon.png'
            width={32}
            height={32}
            alt='user'
          />
          <div>
            <span>para</span>
            <select name='' id=''>
              {iniciativas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </header>
        <textarea />
        <div className='flex gap-4'>
          <div>
            <input type='file' id='foto' className='hidden' />
            <label
              htmlFor='foto'
              className='flex items-center justify-center gap-2 rounded-[100px] border border-blue-600 px-4 py-2 font-bold text-blue-700'
            >
              {' '}
              <Image className='h-[14px] w-4' src='/icon/photo_camera' width={16} height={14} alt='icon photo' /> Foto
            </label>
          </div>
          <div>
            <input type='file' id='video' className='hidden' />
            <label
              htmlFor='video'
              className='flex items-center justify-center gap-2 rounded-[100px] border border-blue-600 px-4 py-2 font-bold text-blue-700'
            >
              {' '}
              <Image className='h-[14px] w-4' src='/icon/videocam.svg' width={16} height={14} alt='icon video' /> Video
            </label>
          </div>
        </div>
        <button className='rounded-[100px] border bg-blue-600 px-6 py-2 text-white' type='submit'>
          Publicar
        </button>
      </form>
    </>
  )
}

export default Createpost
