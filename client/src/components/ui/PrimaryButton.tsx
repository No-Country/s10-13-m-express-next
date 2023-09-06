interface Props {
  children: React.ReactNode
  onClick?: () => void
}

function PrimaryButton({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className='bg-blue-500 text-white py-2 px-6 rounded-full justify-self-center drop-shadow-md hover:bg-[#7B92FE]'>
      {children}
    </button>
  )
}

export default PrimaryButton
