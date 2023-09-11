import store from '@/redux/store'
import { currentUsersApi } from '@/redux/services/users.service'

async function getData(id: string) {
  const { data } = await store.dispatch(currentUsersApi.endpoints.getUsersById.initiate(id))
  return data
}

export default async function RootLayout({
  children,
  user,
  org,
  params
}: {
  children: React.ReactNode
  user: React.ReactNode
  org: React.ReactNode
  params: any
}) {
  const data = await getData(params.username)
  const value = data?.user?.role
  console.log(value)
  return (
    <div className='flex min-h-screen w-screen flex-col'>
      {value === 'volunteer' ? user : value === 'organization' ? org : 'null'}
    </div>
  )
}
