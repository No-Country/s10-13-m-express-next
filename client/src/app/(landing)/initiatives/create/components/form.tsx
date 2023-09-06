'use client'
import {Heading } from '@/components'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import GeneralInfo from './generalInfo'
import LocationInfo from './locationInfo'
import DateTime from './dateTime'

async function postData(form: any) {
  const res = await axios.post('http://localhost:3001/api/initiatives', form)
  console.log(res)
}

export type FormProps = {
  title: string
  description: string
  deadLine: string
  startDate: string
  endDate: string
  categories: string[]
  opportunities: string[]
  locations: string
  languages: string[]
  ownerId: string
  startHour: string
  endHour: string
  extraInfo: string
  themes: string[]
}

export default function FormSec() {
  const formRef = useRef<HTMLFormElement>(null)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange'
  })
  const [languages, setLanguages] = useState<string[]>([])
  const [themes, setThemes] = useState<string[]>([])
  const [opportunities, setOpportunities] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [formValues, setFormValues] = useState<FormProps>({} as FormProps)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const cleanForm = () => {
    setFormValues({
      title: '',
      description: '',
      deadLine: '',
      startDate: '',
      endDate: '',
      categories: [],
      opportunities: [],
      locations: '',
      languages: [],
      ownerId: '',
      startHour: '',
      endHour: '',
      extraInfo: '',
      themes: []
    })

    setLanguages([])
    setThemes([])
    setOpportunities([])
    setCategories([])
    formRef.current?.reset()
  }

  const onSubmit = (e: any) => {
    const formData = {
      ...formValues,
      languages,
      themes,
      opportunities,
      categories,
      ownerId: '64f6ac5dbd10725027c83414',
      startDate: new Date(formValues.startDate).toISOString(),
      endDate: new Date(formValues.endDate).toISOString(),
      deadLine: new Date(formValues.deadLine).toISOString()
    }
    console.log(formData, errors)
    postData(formData)
    cleanForm()
  }

  return (
    <section className='flex items-center  justify-center'>
      <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Heading>Crear iniciativa</Heading>
        <GeneralInfo
          setLanguages={setLanguages}
          setThemes={setThemes}
          setOpportunities={setOpportunities}
          languages={languages}
          themes={themes}
          opportunities={opportunities}
          handleChange={handleChange}
          formValues={formValues}
          categories={categories}
          setCategories={setCategories}
          errors={errors}
          register={register}
        />
        <LocationInfo handleChange={handleChange} formValues={formValues} errors={errors} register={register} />
        <DateTime handleChange={handleChange} formValues={formValues} errors={errors} register={register} />
        <button type='submit' className='w-max rounded-full bg-blue-500 px-6 py-2 text-lg font-semibold text-white'>
          Crear iniciativa
        </button>
      </form>
    </section>
  )
}
