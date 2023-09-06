import Image from 'next/image'

interface ActiveInitiativeProps {
  title: string
  url?: string
}

const ActiveInitiative = ({ title = 'Ayudantes para la playa', url = 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }: ActiveInitiativeProps) => {
  return (
    <>
      <article className='flex flex-col gap-2 p-4 rounded-2xl shadow-initiativeItem max-w-[9.25rem] bg-gray-75'>
        <Image className='rounded-2xl self-stretch' src={url} alt='' height={92} width={116} />
        <h3 className='max-w-[9.25rem] h-[2.5rem] truncate'>{title}</h3>
      </article>
    </>
  )
}

export default ActiveInitiative
