import { useMemo } from 'react';
import { useTable } from 'react-table';
import styles from './EntriesTable.module.scss';

const EntriesTable = ({ entries }) => {
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
    <div className={styles.entriesTableContainer}>
      <table {...getTableProps()} className={styles.entriesTable}>
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

export default EntriesTable;
