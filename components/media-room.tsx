'use client'

import { useEffect, useState } from 'react'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

interface MediaRoomProps {
    chatId: string
    audio: boolean
    video: boolean
}

export const MediaRoom = ({
  chatId,
  audio,
  video
}: MediaRoomProps) => {
  const { user } = useUser()
  const [token, setToken] = useState()

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [user?.firstName, user?.lastName, chatId])

  if (token === '') {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Loader2 className='size-7 text-zinc-500 animate-spin my-4' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          Loading...
        </p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      data-lk-theme='default'
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect
      audio={audio}
      video={video}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}