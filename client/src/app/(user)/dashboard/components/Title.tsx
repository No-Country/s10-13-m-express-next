
interface TitleProps {
  title: string
}

const Title = ({ title }: TitleProps) => {
  return (
    <header className='flex justify-between items-center gap-x-10 text-blue-600 text-xl font-medium text-center px-2'>
      <h2>{title}</h2>
      <span className='cursor-pointer text-base'>Ver todas {'>'}</span>
    </header>
  )
}

export default Title
