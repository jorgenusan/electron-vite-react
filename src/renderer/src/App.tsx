import { Content, RootLayout, Sidebar } from './components/Applayout'
import MarkdownEditor from './components/MarkdownEditor'
import FloatingNoteTitle from './components/FloatingNoteTitle'
import { useRef } from 'react'
import ActionButtonsRow from './components/ActionButtonsRow'
import NotePreviewList from './components/NotePreviewList'
import TabNotes from './components/TabNotes'

const App = () => {
  const contentConatinerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentConatinerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>

        <Content ref={contentConatinerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <TabNotes />
          {/* <FloatingNoteTitle /> */}
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
