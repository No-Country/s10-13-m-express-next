interface Props {
  title: string
  icon: JSX.Element
  bgColor?: 'gray' | 'pink' | 'blue' | 'green' | 'yellow' | 'red'
}

const Pill = (props: Props) => {
  const { title, icon, bgColor } = props

  return (
    <div
      className={`flex items-center justify-center gap-[4px] rounded-full bg-${
        bgColor || 'gray'
      }-500 px-[4px] py-[2px]`}
    >
      {icon}
      <p className='text-xs font-normal text-white'>{title}</p>
    </div>
  )
}

export default Pill
