import { useState } from 'react';
import { ExportButtonsController } from './ExportButtons.ctrl';
import styles from './ExportButtons.module.scss';
import clsx from 'clsx';

const ExportButtons = ({ entries }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const controller = new ExportButtonsController();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const exportDropdownClassNames = clsx(
    isDropdownOpen ? styles.open : styles.closed,
    styles.exportDropdown
  );

  return (
    <div className={styles.exportButtons}>
      <button className={exportDropdownClassNames} onClick={toggleDropdown}>
        Export
      </button>
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <button onClick={() => controller.exportPDF(entries)}>
            Export PDF
          </button>
          <button onClick={() => controller.handleExportCSV()}>
            Export CSV
          </button>
          <button onClick={() => controller.exportXLS(entries)}>
            Export XLS
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButtons;
