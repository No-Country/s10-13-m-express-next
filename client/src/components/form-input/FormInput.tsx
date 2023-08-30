import clsx from 'clsx'

interface Props {
  type: string
  placeHolder: string
  key?: number
}

function FormInput({ type, placeHolder, key }: Props) {
  const styles = {
    input: clsx('col-start-3 col-end-5 w-56 border border-solid border-black p-1 md:w-96')
  }
  return <input type={type} placeholder={placeHolder} className={styles.input} />
}

export default FormInput
