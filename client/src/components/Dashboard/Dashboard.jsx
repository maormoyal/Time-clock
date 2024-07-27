import { useEffect, useState, useMemo } from 'react';
import { DashboardController } from './Dashboard.ctrl';
import styles from './Dashboard.module.scss';
import EntryForm from '../EntryForm/EntryForm';
import ExportButtons from '../ExportButtons/ExportButtons';
import EntriesTable from '../EntriesTable/EntriesTable';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const controller = useMemo(() => new DashboardController(), []);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await controller.loadEntries();
      setEntries(data);
    };
    fetchEntries();
  }, [controller]);

  const handleAddEntry = async (type, note) => {
    const newEntry = await controller.handleAddEntry(type, note);
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <div className={styles.dashboard}>
      <div className={'content-width'}>
        <EntryForm onAddEntry={handleAddEntry} />
        <EntriesTable entries={entries} />
        <ExportButtons entries={entries} />
      </div>
    </div>
  );
};

export default Dashboard;
