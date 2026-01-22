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
  channel: string,
  social: {
    twitter: string,
    facebook: string,
    instagram: string
  }
}

const YoutubeForm = () => {

  const form = useForm<FormValues>({
    // Load the previous saved data
    // defaultValues: async () => {
    //   const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    //   const data = await res.json();

    //   console.log(data)
    //   return {
    //     username: data.username,
    //     email: data.email,
    //     channel: data.name
    //   }
    // }

    // In defaultValues we can pass the default value in the field that can be edited.
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
        instagram: ''
      }
    }
  });

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

        <div className='space-x-2 flex flex-col w-2xs'>
          <p>Socials</p>

          <div className='space-y-2'>
            <label htmlFor="twitter">Twitter</label>
            <input type="text" id="twitter" {...register('social.twitter')} />
            <p className='text-red-500 text-sm'>{errors.channel?.message}</p>
          </div>

          <div className='space-y-2'>
            <label htmlFor="facebook">Facebook</label>
            <input type="text" id="facebook" {...register('social.facebook')} />
            <p className='text-red-500 text-sm'>{errors.channel?.message}</p>
          </div>

          <div className='space-y-2'>
            <label htmlFor="instagram">Instagram</label>
            <input type="text" id="instagram" {...register('social.instagram')} />
            <p className='text-red-500 text-sm'>{errors.channel?.message}</p>
          </div>
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
      </form>
      <DevTool control={form.control as any} />
    </div>
  )
}

export default YoutubeForm