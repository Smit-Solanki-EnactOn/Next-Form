import React from 'react'
import { useForm } from 'react-hook-form'

const YoutubeForm = () => {

  const form = useForm();

  return (
    <div>
      <form className='space-y-4'>
        <div className='space-x-2'>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className='space-x-2'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className='space-x-2'>
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" name="channel" />
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
      </form>

    </div>
  )
}

export default YoutubeForm