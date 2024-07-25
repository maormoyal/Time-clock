import {
  fetchEntries,
  addEntry,
  exportCSV,
} from '../repositories/timeEntriesRepository';

class DashboardPresenter {
  constructor(view) {
    this.view = view;
  }

  async loadEntries() {
    const data = await fetchEntries();
    this.view.setEntries(data);
  }

  async handleAddEntry(type, note) {
    const data = await addEntry(type, note);
    this.view.addEntry(data);
  }

  async handleExportCSV() {
    const data = await exportCSV();
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'entries.csv');
    document.body.appendChild(link);
    link.click();
  }

  exportPDF(entries) {
    const doc = new jsPDF();
    doc.text('Time Entries', 10, 10);
    entries.forEach((entry, index) => {
      doc.text(
        `${index + 1}. ${entry.type} - ${new Date(
          entry.timestamp
        ).toLocaleString()} - ${entry.note}`,
        10,
        20 + index * 10
      );
    });
    doc.save('entries.pdf');
  }

  exportXLS(entries) {
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entries');
    XLSX.writeFile(wb, 'entries.xlsx');
  }

  logout() {
    localStorage.removeItem('token');
    this.view.navigate('/login');
  }
}

export default DashboardPresenter;
