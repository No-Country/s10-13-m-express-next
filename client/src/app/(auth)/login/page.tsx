import Link from 'next/link'
import GoogleButton from './google'

export default function LoginPage() {
  return (
    <>
      <h1>Login page</h1>
      <GoogleButton />
      <Link href='/register'>Register</Link>
    </>
  )
}
