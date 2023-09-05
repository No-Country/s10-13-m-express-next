import { Heading } from '@/components'
import Accordion from './components/Accordion'
import ConsultForm from './components/ConsultForm'

function HelpPage() {
  return (
    <main className='space-y-8 p-section'>
      <Heading>Ayuda</Heading>
      <section className='space-y-6'>
        <Heading as='h2'>Preguntas frecuentes</Heading>
        <Accordion />
      </section>
      <section className='space-y-6'>
        <Heading as='h2'>¿Tienes otra consulta?</Heading>
        <ConsultForm />
      </section>
    </main>
  )
}

export default HelpPage
