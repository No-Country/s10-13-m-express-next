interface Props {
  content: string
}

function Submit({ content }: Props) {
  return (
    <button type='submit' className='bg-black px-6 py-3 text-white'>
      {content}
    </button>
  )
}

export default Submit
