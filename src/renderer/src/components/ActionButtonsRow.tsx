import { ComponentProps } from 'react'
import NewNoteButton from './Buttons/NewNoteButton'
import { DeleteNoteButton } from './Buttons/DeleteNoteButton'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}

export default ActionButtonsRow
