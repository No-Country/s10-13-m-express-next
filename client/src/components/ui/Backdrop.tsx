'use client'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

function Backdrop({ children, onClick }: Props) {
  return (
    <motion.div
      onClick={onClick}
      className='absolute top-0 left-0 h-full w-full bg-[#000000ce] flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
