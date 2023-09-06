import { type TailwindColors } from '@/types'
import { colorVariants } from '@/utils/constants/icons-colors.const'

interface Props {
  height?: number
  color: TailwindColors
}

function LocationIcon(props: Props) {
  const { height, color } = props
  const DEFAULT_WIDTH = 26
  const DEFAULT_HEIGHT = 34

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`${colorVariants[color]}`}
      height={height}
      viewBox={`0 -1 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}`}
    >
      <path d='M12.9664 33.037L13 33.0675L13.0336 33.037C17.0605 29.3819 20.0702 25.9852 22.061 22.8468C24.0516 19.7085 25.05 16.7992 25.05 14.12C25.05 10.1092 23.8401 6.90879 21.4163 4.52436C18.9951 2.14249 16.189 0.95 13 0.95C9.81096 0.95 7.00486 2.14249 4.58369 4.52436C2.15991 6.90879 0.95 10.1092 0.95 14.12C0.95 16.7992 1.94836 19.7085 3.93903 22.8468C5.92976 25.9852 8.93947 29.3819 12.9664 33.037ZM13.0033 16.65C13.7406 16.65 14.3713 16.3693 14.8928 15.8106C15.4142 15.252 15.675 14.5797 15.675 13.7964C15.675 13.0131 15.413 12.3419 14.8893 11.7857C14.3656 11.2295 13.7338 10.95 12.9967 10.95C12.2594 10.95 11.6287 11.2307 11.1072 11.7894C10.5858 12.348 10.325 13.0203 10.325 13.8036C10.325 14.5869 10.587 15.2581 11.1107 15.8143C11.6344 16.3705 12.2662 16.65 13.0033 16.65ZM20.326 21.0341C18.7471 23.6465 16.3058 26.5584 13.0004 29.7699C9.7694 26.5585 7.34642 23.6465 5.73002 21.0337C4.10746 18.411 3.3 16.1069 3.3 14.12C3.3 10.9897 4.23755 8.43064 6.10988 6.43844C7.98276 4.44564 10.2784 3.45 13 3.45C15.7216 3.45 18.0172 4.44564 19.8901 6.43844C21.7624 8.43064 22.7 10.9897 22.7 14.12C22.7 16.1073 21.9111 18.4114 20.326 21.0341Z' />
    </svg>
  )
}

export default LocationIcon
