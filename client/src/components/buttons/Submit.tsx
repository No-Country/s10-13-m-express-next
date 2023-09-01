interface Props {
  content: string
}

function Submit({ content }: Props) {
  return (
    <button
      type='submit'
      className='shadow-ms col-span-full justify-self-center rounded-3xl bg-blue-500 px-6 py-3 text-white shadow-gray-400 transition duration-500 hover:bg-blue-400 hover:shadow-gray-800'
    >
      {content}
    </button>
  )
}

export default Submit
