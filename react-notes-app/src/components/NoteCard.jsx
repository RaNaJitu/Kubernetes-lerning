import { Icon } from './Icons'

const palette = ['lavender', 'mint', 'peach', 'blue', 'rose', 'yellow']

export default function NoteCard({ note, index, onEdit, onDelete }) {
  const tone = palette[index % palette.length]
  const date = new Date(note.updatedAt || note.createdAt)
  const formattedDate = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)

  return (
    <article className={`note-card note-${tone}`}>
      <div className="note-card-top">
        <span className="note-type"><span className="note-type-dot" /> NOTE</span>
        <div className="note-actions">
          <button className="icon-button" onClick={() => onEdit(note)} aria-label={`Edit ${note.title}`} title="Edit note"><Icon name="edit" size={16} /></button>
          <button className="icon-button delete-action" onClick={() => onDelete(note)} aria-label={`Delete ${note.title}`} title="Delete note"><Icon name="trash" size={16} /></button>
        </div>
      </div>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-description">{note.description}</p>
      <div className="note-card-footer"><span><Icon name="calendar" size={14} /> {formattedDate}</span><span className="note-footer-dot" /></div>
    </article>
  )
}
