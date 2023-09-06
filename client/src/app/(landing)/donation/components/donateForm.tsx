'use client'
import { FormInput, Heading } from '@/components'
import Slider from '@mui/material/Slider'
import { useState } from 'react'

function Donation() {
  const min = 500
  const max = 1000000
  const [value, setValue] = useState(5000)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
  }

  return (
    <div className='flex w-full flex-col gap-5'>
      <Heading as='h2'>Hacer una donacion</Heading>
      <div className='flex flex-col items-center gap-3'>
        <p className='rounded-full bg-blue-200 px-4 py-1 text-2xl font-medium'>${value}</p>
        <Slider
          onChange={handleChange}
          defaultValue={5000}
          min={500}
          max={100000}
          value={value}
          aria-label='Default'
          valueLabelDisplay='auto'
        />
        <div className='flex w-full justify-between'>
          <p>${min}</p>
          <p>${max}</p>
        </div>
      </div>
    </div>
  )
}

function PaymentMethod() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <Heading as='h2'>Metodo de pago</Heading>
      <form className='flex grid-cols-2 flex-col gap-4 lg:grid'>
        <FormInput type='text' name='cardNumber' label='' placeholder='Numero de tarjeta' required />
        <FormInput type='text' name='cadNumber' label='' placeholder='Fecha de caducidad' required />
        <FormInput type='text' name='csv' label='' placeholder='Codigo se seguridad' required />
      </form>
    </div>
  )
}

function BillingInformation() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <Heading as='h2'>Datos de facturación</Heading>
      <form className='flex grid-cols-2 flex-col gap-4 lg:grid'>
        <FormInput type='text' name='firstName' label='' placeholder='Nombre' required />
        <FormInput type='text' name='lastName' label='' placeholder='Apellido' required />
        <FormInput type='text' name='country' label='' placeholder='Pais' required />
        <FormInput type='text' name='adress' label='' placeholder='Direccion' required />
        <FormInput type='text' name='city' label='' placeholder='Ciudad' required />
        <FormInput type='text' name='state' label='' placeholder='Estado/Provincia' required />
        <FormInput type='text' name='zip' label='' placeholder='Codigo Postal' required />
      </form>
    </div>
  )
}

function Contact() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <Heading as='h2'>Información de contacto</Heading>
      <form className='flex grid-cols-2 flex-col gap-4 lg:grid'>
        <FormInput type='text' name='email' label='' placeholder='Email' required />
        <FormInput type='text' name='phone' label='' placeholder='Telefono' required />
      </form>
    </div>
  )
}

export default function DonateSec() {
  return (
    <section className='gap-main py-section flex  w-full flex-col items-center justify-center pt-0'>
      <Donation />
      <PaymentMethod />
      <BillingInformation />
      <Contact />
      <button className='rounded-full bg-blue-500 px-6 py-2 text-lg font-semibold text-white'>Donar</button>
    </section>
  )
}
