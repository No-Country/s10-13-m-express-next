import ActiveInitiatives from './components/ActiveInitiatives'
import Createpost from './components/CreatePost'
import Nominations from './components/Nominations'

export default function DashboardPage() {
  return (
    <>
      <Createpost />
      <ActiveInitiatives />
      <Nominations />
    </>
  )
}
