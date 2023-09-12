interface Props {
  menuOpened: boolean
  toggleMenu: () => void
}

function HamburgerMenuBtn({ menuOpened, toggleMenu }: Props) {
  return (
    <button onClick={toggleMenu} className='fixed right-4 top-2 z-50 h-11 w-11 rounded-md bg-transparent p-3'>
      <div
        className={`h-0.5 w-full rounded-md bg-blue-700 transition-all
            ${menuOpened ? 'translate-y-0.5 rotate-45' : ''}
          `}
      />
      <div
        className={`my-1 h-0.5 w-full rounded-md bg-blue-700
            ${menuOpened ? 'hidden' : ''}
          `}
      />
      <div
        className={`h-0.5 w-full rounded-md bg-blue-700 transition-all
            ${menuOpened ? '-rotate-45' : ''}
          `}
      />
    </button>
  )
}

export default HamburgerMenuBtn
