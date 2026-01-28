'use client'
import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
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
  },
  phoneNumbers: string[],
  phNumbers: {
    number: string;
  }[],
  age: number,
  dob: Date
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
        instagram: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
      age: 0,
      dob: new Date()
    },
  });

  const { register, control, handleSubmit, formState, watch, getValues, setValue, reset } = form;
  const { errors, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  console.log({isSubmitting, isSubmitted, isSubmitSuccessful})

  // const { name, ref, onChange, onBlur } = register('username');

  const onSubmit = (data: FormValues) => {
    console.log('form Submitted', data)

  }

  const handleGetValue = () => {
    console.log("get value", getValues());
  }

  const handleSetValue = () => {
    setValue('username', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset();
    }
  }, [])

  const watchUsername = watch(["username", "email"])

  useEffect(() => {
    // console.log( 'Watched Value: ', watchUsername)
    const subscription = watch((value) => {
      console.log(value)
    })
    return () => subscription.unsubscribe();
  }, [watchUsername])

  return (
    <div>
      <h1>Watched USERNAME Value: {watchUsername[0]}, & EMAIL Value: {watchUsername[1]}</h1>
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
            <input type="text" id="twitter" {...register('social.twitter', {
              disabled: false
            })} />
          </div>

          <div className='space-y-2'>
            <label htmlFor="facebook">Facebook</label>
            <input type="text" id="facebook" {...register('social.facebook')} />
          </div>

          <div className='space-y-2'>
            <label htmlFor="instagram">Instagram</label>
            <input type="text" id="instagram" {...register('social.instagram')} />
          </div>
        </div>

        <div className='space-y-2'>
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input type="text" id="primaryPhone" {...register('phoneNumbers.0', {
            required: {
              value: true,
              message: 'Primary Phone Number is require'
            }
          })} />
          <p className='text-red-500 text-sm'>{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className='space-y-2'>
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input type="text" id="secondary-phone" {...register('phoneNumbers.1', {
            required: {
              value: true,
              message: 'Secondary Phone Number is required.'
            }
          })} />
          <p className='text-red-500 text-sm'>{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div className='space-x-2'>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register('age', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Age is required'
            }
          })} />
          <p className='text-red-500 text-sm'>{errors.age?.message}</p>
        </div>

        <div className='space-x-2'>
          <label htmlFor="dob">Date Of Birth</label>
          <input type="date" id="dob" {...register('dob', {
            valueAsDate: true,
            required: {
              value: true,
              message: 'Date Of Birth is required'
            }
          })} />
          <p className='text-red-500 text-sm'>{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid || !isSubmitting} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>

        <button role='button' onClick={handleGetValue}>
          Get value
        </button>

        <button role='button' onClick={handleSetValue}>
          Set Value
        </button>

        <button role='button' onClick={() => reset()}>
          Reset
        </button>
      </form>
      <DevTool control={form.control as any} />
    </div>
  )
}

export default YoutubeForm