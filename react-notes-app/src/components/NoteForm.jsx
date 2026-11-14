import { useEffect, useState } from 'react'
import { Icon } from './Icons'

export default function NoteForm({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title ?? '')
  const [description, setDescription] = useState(note?.description ?? '')
  const [error, setError] = useState('')

  useEffect(() => {
    const handleKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanDescription = description.trim()
    if (!cleanTitle || !cleanDescription) {
      setError('Please add both a title and a description.')
      return
    }
    onSave({ title: cleanTitle, description: cleanDescription })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="note-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading">
          <div><span className="eyebrow">YOUR PERSONAL SPACE</span><h2 id="modal-title">{note ? 'Edit your note' : 'Create a note'}</h2><p>Capture that thought before it slips away.</p></div>
          <button className="icon-button modal-close" onClick={onClose} aria-label="Close dialog"><Icon name="close" size={19} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="note-title">Title <span>*</span></label>
          <input id="note-title" className="form-input" value={title} onChange={(event) => { setTitle(event.target.value); setError('') }} placeholder="Give your note a title" maxLength={90} autoFocus />
          <div className="field-meta"><span>Make it short and memorable</span><span>{title.length}/90</span></div>
          <label className="field-label description-label" htmlFor="note-description">Description <span>*</span></label>
          <textarea id="note-description" className="form-input form-textarea" value={description} onChange={(event) => { setDescription(event.target.value); setError('') }} placeholder="Start writing your thoughts..." rows={6} maxLength={5000} />
          <div className="field-meta"><span>Your ideas, plans, reminders...</span><span>{description.length}/5000</span></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-footer"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary"><Icon name="note" size={16} /> {note ? 'Save changes' : 'Save note'}</button></div>
        </form>
      </section>
    </div>
  )
}
