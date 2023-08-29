"use client"
import axios from "axios"

export default function LoginPage() {

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:3001/api/auth/login", {
      email: "thomasbarenghi2@gmail.com",
      password: "test1"
    },
    {
      withCredentials: true
    })
    console.log(response)
  }

  const handleTest = async () => {
    const response = await axios.get("http://localhost:3001/api/auth/verify", {
      withCredentials: true
    })
    console.log(response)
  }

  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3001/api/auth/logout", {
      withCredentials: true
    })  

    console.log(response)
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleTest}>Test</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}