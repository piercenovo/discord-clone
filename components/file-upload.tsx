'use client'

import { File, X } from 'lucide-react'

import { UploadButton, UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'

interface FileUploadProps {
  handleChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({
  handleChange,
  value,
  endpoint
}: FileUploadProps) => {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative size-20'>
        <Image
          fill
          blurDataURL={value}
          src={value}
          alt='Upload'
          className='rounded-full'
        />
        <button
          onClick={() => handleChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          type='button'
        >

          <X className='size-4' />
        </button>
      </div>
    )
  }

  if (value && fileType === 'pdf') {
    return (
      <div className='relative h-20 w-full flex items-center p-2 rounded-md bg-background/10'>
        <File className='size-10 fill-indigo-200 stroke-indigo-400' />
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
        >
          {value}
        </a>
        <button
          onClick={() => handleChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
          type='button'
        >

          <X className='size-4' />
        </button>
      </div>
    )
  }

  return (
    <div className='relative h-20 w-64 flex items-center justify-center'>
      <UploadButton
        endpoint={endpoint}
        className='h-20 w-64'
        onClientUploadComplete={(res => {
          handleChange(res?.[0].url)
        })}
        onUploadError={(error: Error) => {
          console.log(error)
        }}
      />
    </div>
  )
}
