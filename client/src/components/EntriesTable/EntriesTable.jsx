import { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import styles from './EntriesTable.module.scss';

import sortIcon from '../../assets/sort.icon.svg';
import sortUpIcon from '../../assets/sort-up.icon.svg';
import sortDownIcon from '../../assets/sort-down.icon.svg';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <div className={styles.tableSearchWrapper}>
      <input
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search in ${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </div>
  );
}

const EntriesTable = ({ entries }) => {
  const [globalFilter] = useState('');

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter: setGlobalFilterState,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { globalFilter: globalFilter },
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilterState}
      />
      <div className={styles.entriesTableContainer}>
        <table {...getTableProps()} className={styles.entriesTable}>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={columnIndex}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img src={sortDownIcon} alt='sorted descending' />
                        ) : (
                          <img src={sortUpIcon} alt='sorted ascending' />
                        )
                      ) : (
                        <img src={sortIcon} alt='sortable' width={15} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: 'center', padding: '20px' }}
                >
                  No results found
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => {
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
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EntriesTable;
