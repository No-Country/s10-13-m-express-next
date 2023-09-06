import Image from 'next/image'
import photo from '@/../public/icon/photo_camera.svg'
import video from '@/../public/icon/videocam.svg'

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
      <h2 className='text-blue-600 text-xl font-medium'>Createpost</h2>
      <form className='flex flex-col gap-3 bg-gray-75 rounded-xl py-4 px-3'>
        <header className='flex justify-between'>
          <Image src='https://www.nicepng.com/png/full/128-1280406_user-icon-png.png' width={32} height={32} alt='user' />
          <div>
            <span>para</span>
            <select name='' id=''>
              {
                iniciativas.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
            }
            </select>
          </div>
        </header>
        <textarea />
        <div className='flex gap-4'>

          <div>
            <input type='file' id='foto' className='hidden' />
            <label htmlFor='foto' className='items-center justify-center py-2 px-4 border border-blue-600 text-blue-700 flex gap-2 font-bold rounded-[100px]'> <Image className='w-4 h-[14px]' src={photo} width={16} height={14} alt='icon photo' /> Foto</label>
          </div>
          <div>
            <input type='file' id='video' className='hidden' />
            <label htmlFor='video' className='items-center justify-center py-2 px-4 border border-blue-600 text-blue-700 flex gap-2 font-bold rounded-[100px]'> <Image className='w-4 h-[14px]' src={video} width={16} height={14} alt='icon video' /> Video</label>
          </div>
        </div>
        <button className='rounded-[100px] py-2 px-6 border bg-blue-600 text-white' type='submit'>Publicar</button>

      </form>
    </>
  )
}

export default Createpost
