import { fetchEntries, addEntry, exportCSV } from './Dashboard.model';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export class DashboardController {
  async loadEntries() {
    const entries = await fetchEntries();
    return Array.isArray(entries) ? entries : [];
  }

  async handleAddEntry(type, note) {
    const entry = await addEntry(type, note);
    return entry;
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
    if (!Array.isArray(entries)) {
      console.error('Expected entries to be an array');
      return;
    }

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
    if (!Array.isArray(entries)) {
      console.error('Expected entries to be an array');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entries');
    XLSX.writeFile(wb, 'entries.xlsx');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
