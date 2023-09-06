
import { Footer, HamburgerMenu } from '@/components'
import './globals.scss'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

interface Props {
  children: React.ReactNode
}

function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className='min-h-screen'>
        <HamburgerMenu />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
