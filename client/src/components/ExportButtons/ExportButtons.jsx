import { ExportButtonsController } from './ExportButtons.ctrl';
import styles from './ExportButtons.module.scss';

const ExportButtons = ({ entries }) => {
  const controller = new ExportButtonsController();

  return (
    <div className={styles.exportButtons}>
      <button onClick={() => controller.exportPDF(entries)}>Export PDF</button>
      <button onClick={() => controller.handleExportCSV()}>Export CSV</button>
      <button onClick={() => controller.exportXLS(entries)}>Export XLS</button>
      <button onClick={controller.logout}>Logout</button>
    </div>
  );
};

export default ExportButtons;
