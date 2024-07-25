import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState('');
  const [type, setType] = useState('entry');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        'http://localhost:5000/api/time-entries',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEntries(data);
    };
    fetchEntries();
  }, []);

  const handleAddEntry = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(
      'http://localhost:5000/api/time-entries',
      { type, note },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setEntries([...entries, data]);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const exportPDF = () => {
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
  };

  const exportCSV = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/export/csv', {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'entries.csv');
    document.body.appendChild(link);
    link.click();
  };

  const exportXLS = () => {
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entries');
    XLSX.writeFile(wb, 'entries.xlsx');
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp',
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: 'Note',
        accessor: 'note',
      },
    ],
    []
  );

  const data = useMemo(() => entries, [entries]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <h1>Dashboard</h1>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value='entry'>Entry</option>
        <option value='break'>Break</option>
        <option value='exit'>Exit</option>
      </select>
      <input
        type='text'
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='Note'
      />
      <button onClick={handleAddEntry}>Add Entry</button>
      <button onClick={exportPDF}>Export PDF</button>
      <button onClick={exportCSV}>Export CSV</button>
      <button onClick={exportXLS}>Export XLS</button>
      <button onClick={logout}>Logout</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th {...column.getHeaderProps()} key={columnIndex}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td {...cell.getCellProps()} key={cellIndex}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
