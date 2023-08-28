"use client"
import axios from "axios"

export default function LoginPage() {

  const handleLogin = async () => {
    const response = await axios.post("http://127.0.0.1:3001/api/auth/login", {
      email: "thomasbarenghi2@gmail.com",
      password: "test1"
    },
    {
      withCredentials: true
    })
    console.log(response)
  }

  const handleTest = async () => {
    const response = await axios.get("http://127.0.0.1:3001/api/auth/test", {
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