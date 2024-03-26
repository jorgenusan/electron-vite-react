import { homedir } from 'os'
import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { ensureDir, readdir, stat, readFile, writeFile } from 'fs-extra'
import { NoteInfo } from '@shared/models'
import { CreateNote, GetNotes, ReadNote } from '@shared/types'
import { dialog } from 'electron'
import path from 'path'
import { isEmpty } from 'lodash'

export const getRootPath = () => {
  return `${homedir()}\\${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootPath()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile('', { encoding: fileEncoding })

    // create the welcome note
    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootPath()}/${fileName}`)

  return {
    title: fileName.replace('.md', ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName: string) => {
  const rootPath = getRootPath()
  return readFile(`${rootPath}/${fileName}.md`, { encoding: fileEncoding })
}

export const writeNote = async (fileName: string, content: string) => {
  const rootPath = getRootPath()
  await ensureDir(rootPath)
  console.log(`Writing note to ${rootPath}/${fileName}.md`)

  return writeFile(`${rootPath}/${fileName}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootPath()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir}.
      Avoid using other directories!`
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')

  return filename
}
