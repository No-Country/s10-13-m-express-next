import Content from './components/content'

interface Props {
  params: { username: string }
}

export default async function Page({ params }: Props) {
  return <Content name={params.username} />
}
