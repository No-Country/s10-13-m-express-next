'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

export default function LoginPage() {
  const handleLogin = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK}api/auth/login`,
      {
        email: 'thomasbarenghi2@gmail.com',
        password: 'test1'
      },
      {
        withCredentials: true
      }
    )
    console.log(response)
  }

  const handleTest = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK}api/auth/test`, {
      withCredentials: true
    })
    console.log(response)
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleTest}>Test</button>
    </div>
  )
}
