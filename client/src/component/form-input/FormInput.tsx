import clsx from 'clsx'

interface Props {
  type: string
  placeHolder: string
  key?: number
}

function FormInput({ type, placeHolder, key }: Props) {
  const styles = {
    input: clsx('border border-solid border-black bg-black')
  }
  return <input type={type} placeholder={placeHolder} className={styles.input} />
}

export default FormInput
