import { useState } from 'react';
import styles from './EntryForm.module.scss';

const EntryForm = ({ onAddEntry }) => {
  const [type, setType] = useState('');
  const [note, setNote] = useState('');

  const handleAddEntry = () => {
    if (type === '') {
      alert('Please select an action');
      return;
    }
    onAddEntry(type, note);
    setNote('');
    setType('');
  };

  return (
    <div className={styles.entryForm}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value='' disabled>
          Select an action
        </option>
        <option value='entry'>Entry</option>
        <option value='break'>Break</option>
        <option value='exit'>Exit</option>
      </select>
      <input
        type='text'
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='Add note'
      />
      <button onClick={handleAddEntry}>Add</button>
    </div>
  );
};

export default EntryForm;