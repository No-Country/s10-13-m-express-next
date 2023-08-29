'use client'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const credentials = {
  email: 'thomasbarenghi2@gmail.com',
  password: 'test1'
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

const btnStyle = 'bg-blue-700 px-4 py-2 rounded-md text-white mx-4'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('userId')
    if (search) {
      Cookies.set('userId', search, { expires: 1 })
    }
  }, [searchParams])

  const handleLoginLocal = async () => {
    const { data } = await axios.post(`${serverUrl}/auth/login`, credentials)
    Cookies.set('userId', data.userId, { expires: 1 })
  }

  const handleVerify = async () => {
    try {
      await axios.get(`${serverUrl}/auth/verify`, {
        headers: {
          userId: `${Cookies.get('userId')}`
        }
      })
    } catch (err) {
      Cookies.remove('userId')
      console.log(err)
    }
  }

  const handleLogout = async () => {
    Cookies.remove('userId')
    await axios.get(`${serverUrl}/auth/logout`)
  }

  return (
    <div>
      <button onClick={handleLoginLocal} className={btnStyle}>
        Local
      </button>
      <button onClick={() => router.push(`${serverUrl}/auth/google`)} className={btnStyle}>
        Google
      </button>
      <button onClick={handleVerify} className={btnStyle}>
        Verify
      </button>
      <button onClick={handleLogout} className={btnStyle}>
        Logout
      </button>
    </div>
  )
}
