import { Icon } from './Icons'

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <Icon name="search" size={19} />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search your notes..." aria-label="Search notes" />
      {value && <button className="search-clear" type="button" onClick={() => onChange('')} aria-label="Clear search"><Icon name="close" size={16} /></button>}
      {!value && <kbd>⌘ K</kbd>}
    </label>
  )
}
