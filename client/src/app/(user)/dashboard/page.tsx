import ActiveInitiatives from './components/ActiveInitiatives'
import Createpost from './components/CreatePost'
import Nominations from './components/Nominations'

export default function DashboardPage() {
  return (
    <main className='p-section flex flex-col items-center justify-center'>
      <article className='2xl:container'>
        <Createpost />
        <ActiveInitiatives />
        <Nominations />
      </article>
    </main>
  )
}
