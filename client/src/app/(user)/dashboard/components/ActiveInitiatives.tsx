import ListActiveInitiatives from './ListActiveInitiatives'
import Title from './Title'

const ActiveInitiatives = () => {
  return (
    <section className='flex flex-col gap-4 py-4'>
      <Title title='Iniciativas activas' />

      <ListActiveInitiatives />

      <a className=' self-center block rounded-[100px] px-6 py-2 max-w-[224px] max-h-[40px] border border-pink-600 text-pink-600 text-center cursor-pointer'>Crear nueva iniciativa</a>
    </section>
  )
}

export default ActiveInitiatives
