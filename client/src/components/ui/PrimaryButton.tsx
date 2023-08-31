interface Props {
  children: React.ReactNode
}

function PrimaryButton({ children }: Props) {
  return (
    <button 
      className='bg-[#5271FF] text-white py-2 px-6 rounded-full justify-self-center drop-shadow-md hover:bg-[#7B92FE]'
    >
      { children }
    </button>
  )
}

export default PrimaryButton