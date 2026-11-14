import NoteCard from './NoteCard'
import { Icon } from './Icons'

export default function NotesList({ notes, onEdit, onDelete, onAdd, hasSearch }) {
  if (!notes.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><Icon name={hasSearch ? 'search' : 'note'} size={27} /></div>
        <h3>{hasSearch ? 'No matching notes' : 'Your space is still empty'}</h3>
        <p>{hasSearch ? 'Try another keyword or clear your search.' : 'Every great idea starts somewhere. Create your first note and keep it here.'}</p>
        {!hasSearch && <button className="button button-primary" onClick={onAdd}><Icon name="plus" size={17} /> Create your first note</button>}
      </div>
    )
  }
  return <div className="notes-grid">{notes.map((note, index) => <NoteCard key={note.id} note={note} index={index} onEdit={onEdit} onDelete={onDelete} />)}</div>
}
