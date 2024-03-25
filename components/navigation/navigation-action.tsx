'use client'

import { Plus } from 'lucide-react'
import { ActionTooltip } from '@/components/action-tooltip'

export const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip
        side='right'
        align='center'
        label='Add a server'
      >
        <button
          className='group'
        >
          <div className='mx-3 flex size-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700'>
            <Plus
              className='group-hover:text-white transition text-emerald-500'
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>

    </div>
  )
}
