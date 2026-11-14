import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import SearchBar from './components/SearchBar'
import { Icon } from './components/Icons'
import './App.css'

const STORAGE_KEY = 'my-notes-app:v1'

function readNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && typeof item.title === 'string' && typeof item.description === 'string') : []
  } catch (error) {
    console.error('Unable to read notes from localStorage:', error)
    return []
  }
}

export default function App() {
  const [notes, setNotes] = useState(readNotes)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [activeNote, setActiveNote] = useState(null)
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
      setStorageError(false)
    } catch (error) {
      console.error('Unable to save notes to localStorage:', error)
      setStorageError(true)
    }
  }, [notes])

  const visibleNotes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return [...notes]
      .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
      .filter((note) => !query || note.title.toLocaleLowerCase().includes(query) || note.description.toLocaleLowerCase().includes(query))
  }, [notes, search])

  function openCreate() { setActiveNote(null); setModalOpen(true) }
  function openEdit(note) { setActiveNote(note); setModalOpen(true) }
  function saveNote(values) {
    const now = new Date().toISOString()
    if (activeNote) {
      setNotes((current) => current.map((item) => item.id === activeNote.id ? { ...item, ...values, updatedAt: now } : item))
    } else {
      setNotes((current) => [{ id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`, ...values, createdAt: now, updatedAt: now }, ...current])
    }
    setModalOpen(false)
    setActiveNote(null)
  }
  function deleteNote(note) {
    if (window.confirm(`Delete “${note.title}”? This action cannot be undone.`)) {
      setNotes((current) => current.filter((item) => item.id !== note.id))
    }
  }

  return (
    <div className="app-shell" id="top">
      <Navbar onAdd={openCreate} />
      <main className="main-content">
        <section className="welcome-section">
          <div className="welcome-copy"><div className="eyebrow"><Icon name="spark" size={14} /> YOUR THOUGHTS, IN ONE PLACE</div><h1>A little space for<br /><span>big ideas.</span></h1><p>Keep your thoughts organized, one note at a time.</p></div>
          <div className="welcome-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-paper"><span/><span/><span/><i/></div><div className="art-sparkle sparkle-one">✳</div><div className="art-sparkle sparkle-two">✦</div></div>
        </section>

        <section className="notes-section" aria-labelledby="notes-heading">
          <div className="section-topline"><div><div className="eyebrow section-eyebrow">YOUR COLLECTION</div><h2 id="notes-heading">All notes <span className="count-pill">{notes.length}</span></h2></div><SearchBar value={search} onChange={setSearch} /></div>
          {storageError && <div className="storage-warning" role="alert">Your browser couldn't save changes. Check available storage or browser permissions.</div>}
          <div className="list-caption"><span>{search ? `Search results for “${search}”` : 'A collection of your thoughts and ideas'}</span><span className="sort-label"><Icon name="grid" size={14} /> {visibleNotes.length} {visibleNotes.length === 1 ? 'note' : 'notes'}</span></div>
          <NotesList notes={visibleNotes} onEdit={openEdit} onDelete={deleteNote} onAdd={openCreate} hasSearch={Boolean(search.trim())} />
        </section>
      </main>
      <footer className="app-footer"><span>Made for your thoughts.</span><span><span className="footer-dot" /> Private by design · Stored on this device</span></footer>
      {modalOpen && <NoteForm key={activeNote?.id ?? 'new-note'} note={activeNote} onSave={saveNote} onClose={() => { setModalOpen(false); setActiveNote(null) }} />}
    </div>
  )
}
