import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  align?: 'center'
}

function Button({ children, align }: Props) {
  const classes = {
    button: clsx(
      'rounded-full bg-blue-500 px-6 py-2 text-center text-lg font-bold text-white shadow-md shadow-gray-500 transition-colors duration-300 hover:bg-blue-400',
      align === 'center' && 'mx-auto'
    )
  }

  return <button className={classes.button}>{children}</button>
}

export default Button
