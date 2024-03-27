import { cn } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type TabItemProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'a'>

export const TabItem = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  onClose,
  ...props
}: TabItemProps & { onClose?: () => void }) => {

  return (
    <>
      <a role="tab" className={
      cn(
          'tab cursor-pointer flex justify-between',
          {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
          },
          className
      )
      }{...props}>{title} <button onClick={onClose} className='hover:bg-gray-200 hover:rounded pl-2 pr-2'>X</button></a>
    </>
  )
}

export default TabItem