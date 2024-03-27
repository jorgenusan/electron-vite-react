import { notesAtom, openedTabsAtom, selectedNoteIndexAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)
  const [openedTabs, setOpenedTabs] = useAtom(openedTabsAtom);

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)
    
    if (!notes) return
    if (!openedTabs.some((tab) => tab.title === notes[index].title)) {
      setOpenedTabs([...openedTabs, notes[index]])
    }

    if (onSelect) {
      onSelect()
    }
  }

  const handleNoteClose = (index) => () => {
    setOpenedTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
  };
  
  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect,
    openedTabs,
    handleNoteClose
  }
}
