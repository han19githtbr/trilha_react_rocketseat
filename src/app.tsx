import logo from './assets/Logo.svg'
import { NoteCard } from './components/note-card'
import { NewNoteCard } from './components/new-note-card'
import { ChangeEvent, useState } from 'react'


interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    
    return []
  })

  function oneNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    
    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => {
      return note.id != id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value

    setSearch(query)
  }


  const filteredNotes = search != ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) 
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img className='animate-pulse' src = {logo} alt = "NLW Expert" />
      
      <div className="my-4 w-72 relative h-11 min-w-[200px]">
        <input placeholder="Busque em suas notas"
          className="peer h-full 
                    w-full border-b
                    border-blue-gray-300
                    bg-transparent 
                    pt-4 pb-1.5 
                    font-sans text-sm 
                    font-normal text-blue-gray-700 
                    outline outline-0 
                    transition-all 
                    placeholder-shown:border-blue-gray-200 
                    focus:border-gray-500 
                    focus:outline-0 
                    disabled:border-0 
                    disabled:bg-blue-gray-50 
                    placeholder:opacity-0 
                    focus:placeholder:opacity-100"
                    onChange={handleSearch}
        />
        <label
          className="after:content[''] 
                    pointer-events-none absolute left-0
                    -top-1.5 flex h-full w-full
                    select-none !overflow-visible
                    truncate text-[11px] 
                    font-normal leading-tight 
                    text-gray-500 
                    transition-all after:absolute 
                    after:-bottom-1.5 
                    after:block after:w-full 
                    after:scale-x-0 
                    after:border-b-2 
                    after:border-gray-500 
                    after:transition-transform 
                    after:duration-300 
                    peer-placeholder-shown:text-sm 
                    peer-placeholder-shown:leading-[4.25] 
                    peer-placeholder-shown:text-blue-gray-500 
                    peer-focus:text-[11px] 
                    peer-focus:leading-tight 
                    peer-focus:text-gray-400 
                    peer-focus:after:scale-x-100 
                    peer-focus:after:border-blue-500 
                    peer-disabled:text-transparent 
                    peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Busque em suas notas
        </label>
      </div>
      
      {/*<div className='h-px bg-slate-700' />*/}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
      
          <NewNoteCard oneNoteCreated={oneNoteCreated} />  
          
          {filteredNotes.map(note => {
            return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          })}    
      </div>
    </div>
  )
}
