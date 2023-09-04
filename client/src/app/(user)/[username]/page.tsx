import { Reviews } from './components'

interface Props {
  params: {
    username: string
  }
}

export default function ProfilePage(props: Props) {
  const { username } = props.params
  return (
    <>
      <h1>Username: {username}</h1>
      <Reviews />
    </>
  )
}
