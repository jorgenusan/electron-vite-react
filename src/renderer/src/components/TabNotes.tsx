import { ComponentProps } from 'react';
import { useNotesList } from '@renderer/hooks/useNotesList';
import TabItem from './TabItem';
import { cn } from '@renderer/utils';

export type TabNotesProps = ComponentProps<'div'> & {
    onSelect?: () => void
}

    const TabNotes = ({ onSelect, className, ...props }: TabNotesProps) => {
    const { openedTabs, selectedNoteIndex, handleNoteSelect, handleNoteClose } = useNotesList({ onSelect });

    if (!openedTabs) return null

  return (
    <div role="tablist" className={cn("tabs tabs-lifted",className)} {...props}>
        {openedTabs.map((note, index) => (
        <TabItem
            key={note.title}
            isActive={selectedNoteIndex === index}
            onClick={handleNoteSelect(index)}
            onClose={handleNoteClose(index)}
            {...note}
        />
        ))}
    </div>
  );
};

export default TabNotes;