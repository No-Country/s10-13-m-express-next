'use client'
import { Heading } from '@/components'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import GeneralInfo from './generalInfo'
import LocationInfo from './locationInfo'
import DateTime from './dateTime'
import { File } from 'buffer'
import Multimedia from './multimedia'

//Remplazar por Zustand para centralizar el estado
async function postData(form: any) {
  try {
    const formData = new FormData()
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        formData.append(key, form[key])
      }
    }
    const res = await axios.post('http://localhost:3001/api/initiatives', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
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
  thumbnail?: any
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

  const handleChange = (e: any) => {
    const { name, value,type } = e.target
    if(type === 'file'){
      return setFormValues({ ...formValues, [name]: e?.target?.files[0] })
    }
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

  const fdata = new FormData()
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
      thumbnail: formValues.thumbnail,
      deadLine: new Date(formValues.deadLine).toISOString()
    }
   // fdata.append('thumbnail', formValues.thumbnail[0])
    console.log(fdata, errors, formValues.thumbnail)
    postData(formData)
    // cleanForm()
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
        <Multimedia handleChange={handleChange} formValues={formValues} errors={errors} register={register} />

        <button type='submit' className='w-max rounded-full bg-blue-500 px-6 py-2 text-lg font-semibold text-white'>
          Crear iniciativa
        </button>
      </form>
    </section>
  )
}
