'use client'
import clsx from 'clsx'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputProps = {
  type: string
  name: string
  label: string
  placeholder: string
  className?: string
  labelClass?: string
  defaultValue?: string
  value?: string
  prefix?: string
  onChange?: any
  error?: string | null
  step?: string
  required?: boolean
  rows?: number
  selectOptions?: { value: string; label: string }[]
  handleSelectChange?: (e: any) => void
  selectSelected?: { value: string; label: string }
  autoComplete?: 'on' | 'off'
  hookForm?: {
    register: UseFormRegister<any>
    validations: RegisterOptions
  }
}

export default function FormInput(props: InputProps) {
  const styles = {
    input: clsx('col-start-3 col-end-5 w-56 w-full min-w-0 border border-solid border-black')
  }

  const hookForm = props?.hookForm?.register(props.name, props?.hookForm?.validations || {})

  return (
    <label
      htmlFor={props.name}
      className={`smalltext flex w-full min-w-0 flex-col gap-1 font-normal ${props.labelClass}`}
    >
      {props.label}
      {props.type !== 'textarea' && props.type !== 'select' && props.type !== 'file' ? (
        <input
          {...hookForm}
          defaultValue={props.defaultValue}
          type={props.type}
          step={props.step}
          name={props.name}
          value={props.value}
          prefix={props.prefix}
          onChange={(e: any) => {
            hookForm?.onChange(e)
            if (props.onChange) props.onChange(e)
          }}
          placeholder={props.placeholder}
          className={`${props.className} w-full rounded-md border-gray-600 px-4 py-3 ${styles.input}`}
          style={{ borderWidth: '1px' }}
          required={props.required}
          autoComplete={props.autoComplete || 'off'}
        />
      ) : props.type === 'file' ? (
        <input
          {...hookForm}
          type='file'
          name={props.name}
          onChange={(e: any) => {
            hookForm?.onChange(e)
            if (props.onChange) props.onChange(e)
          }}
          className={`${props.className} w-full rounded-md border-gray-600 px-4 py-3 ${styles.input}`}
          style={{ borderWidth: '1px' }}
          required={props.required}
        />
      ) : (
        <textarea
          {...hookForm}
          defaultValue={props.defaultValue}
          name={props.name}
          value={props.value}
          onChange={(e: any) => {
            hookForm?.onChange(e)
            if (props.onChange) props.onChange(e)
          }}
          placeholder={props.placeholder}
          className={`${props.className} w-full rounded-md border-gray-600 px-4 py-3 ${styles.input}`}
          style={{ borderWidth: '1px' }}
          required={props.required}
          rows={props.rows || 1}
        />
      )}
      {props.error && (
        <p className='gap-estilo4 smalltext ml-2 flex font-medium text-red-700 dark:text-red-800'>{props.error}</p>
      )}
    </label>
  )
}
