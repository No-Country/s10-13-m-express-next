import Content from './components/content'

interface Props {
  params: {
    username: string
  }
}

export default function ProfilePage(props: Props) {
  return <Content pathname={props.params.username.slice(3)} />
}
