import { Icon } from './Icons'

export default function Navbar({ onAdd }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#top" aria-label="My Notes home">
          <span className="brand-mark"><Icon name="note" size={21} /></span>
          <span>my<span className="brand-accent">notes</span></span>
        </a>
        <div className="topbar-right">
          <span className="saved-indicator"><span className="status-dot" /> Saved on this device</span>
          <button className="button button-primary nav-add" onClick={onAdd}><Icon name="plus" size={17} /> <span>New note</span></button>
        </div>
      </div>
    </header>
  )
}
