'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const DevTool = dynamic(
  () => import('@hookform/devtools').then((mod) => mod.DevTool),
  { ssr: false }
)

type FormValues = {
  username: string,
  email: string,
  channel: string
}

const YoutubeForm = () => {

  const form = useForm<FormValues>();

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  // const { name, ref, onChange, onBlur } = register('username');

  const onSubmit = (data: FormValues) => {
    console.log('form Submitted', data)
  }

  return (
    <div>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='space-x-2'>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register('username', {
            required: {
              value: true,
              message: 'Username is required'
            }
          })} />
          <p className='text-red-500 text-sm'>{errors.username?.message}</p>
        </div>
        <div className='space-x-2'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email', {
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: 'Provide a valid email'
            },
            validate: {
              notAdmin: (fieldValue) => {
                return fieldValue !== 'admin@example.com' || 'Enter a different Email Address'
              },
              blackListed: (fieldValue) => {
                return !fieldValue.endsWith('@example.com') || 'This Domain is not supported'
              }
            }
          })} />
          <p className='text-red-500 text-sm'>{errors.email?.message}</p>
        </div>
        <div className='space-x-2'>
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel', {
            required: {
              value: true,
              message: 'Channel is required'
            }
          })} />
          <p className='text-red-500 text-sm'>{errors.channel?.message}</p>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
      </form>
      <DevTool control={form.control} />
    </div>
  )
}

export default YoutubeForm