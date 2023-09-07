import Content from './components/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciativa Individual',
  description: '...',
  themeColor: '#000000'
}

type Props = {
  params: {
    id: string
  }
}

function InitiativesPage(props: Props) {
  return (
    <main className='flex flex-col gap-10 py-7'>
      <Content id={props.params.id} />
    </main>
  )
}

export default InitiativesPage
