'use client'
import axios from 'axios'
export default function Home() {
  const handleUpload = async (e: any) => {
    e.preventDefault()
    console.log(e.target.file.files[0])
    const file = e.target.file.files[0]

    const formData = new FormData()
    formData.append('file', file)

    await axios.post('http://localhost:3001/api/users/testImageUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('File Uploaded', formData)
  }

  return (
    <main>
      <h1 className='text-center text-9xl'>Home Page</h1>
      <form onSubmit={handleUpload}>
        <input type='file' name='file' />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}
