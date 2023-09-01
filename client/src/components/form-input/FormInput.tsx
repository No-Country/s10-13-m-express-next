'use client'

import clsx from 'clsx'
import { useState } from 'react'

interface Props {
  type: string
  placeHolder: string
  key?: number
  icon_1?: React.ReactNode
  icon_2?: React.ReactNode
}

function FormInput({ type, placeHolder, key, icon_1, icon_2 }: Props) {
  const [changeIcon, setChangeIcon] = useState(false)
  function valueChangeIcon() {
    event?.preventDefault()
    setChangeIcon(!changeIcon)
  }
  const styles = {
    wrapper: clsx(
      'flex w-72 justify-between rounded-md  border-[1.5px] border-solid border-gray-700 p-2 md:col-start-3 md:col-end-5 md:w-96'
    ),
    input: clsx('focus:outline-none focus:outline-0')
  }
  return (
    <div className={styles.wrapper}>
      <input type={type} placeholder={placeHolder} className={styles.input} />
      {icon_1 && icon_2 ? <button onClick={valueChangeIcon}>{changeIcon ? icon_1 : icon_2}</button> : icon_1}
    </div>
  )
}

export default FormInput
