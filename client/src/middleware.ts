import { NextRequest, NextResponse } from 'next/server'
import { googleSearchParams } from '@/utils/constants/auth.const'

export function middleware(req: NextRequest) {
  console.log('-'.repeat(150))
  const { SESSION_ID, USER_ID } = googleSearchParams
  const sid = req.nextUrl.searchParams.get(SESSION_ID)
  const uid = req.nextUrl.searchParams.get(USER_ID)

  if (sid !== null && uid !== null) {
    console.log('sessionId: ', sid)
    console.log('userId: ', uid)
    const url = req.nextUrl.clone()
    url.searchParams.delete(SESSION_ID)
    url.searchParams.delete(USER_ID)
    url.pathname = '/feed'

    const res = NextResponse.redirect(url)
    res.cookies.set({
      name: SESSION_ID,
      value: sid,
      path: '/'
    })
    res.cookies.set({
      name: USER_ID,
      value: uid,
      path: '/'
    })

    return res
  }
}

export const config = {
  matcher: '/feed'
}
