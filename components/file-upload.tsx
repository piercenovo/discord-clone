'use client'

import { X } from 'lucide-react'

import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
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
      <div className='relative size-56'>
        <Image
          fill
          blurDataURL={value}
          src={value}
          alt='Upload'
          className='rounded-full'
        />
        <button
          onClick={() => handleChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute top-8 right-0 shadow-sm'
          type='button'
        >

          <X className='size-6' />
        </button>
      </div>
    )
  }

  return (
    <div className='relative w-72 h-[13.6rem]'>
      <UploadDropzone
        endpoint={endpoint}
        className='h-[13.6rem]'
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
