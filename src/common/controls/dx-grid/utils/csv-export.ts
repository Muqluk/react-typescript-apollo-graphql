/*
  *
  *   Important to know:
  *     https://en.wikipedia.org/wiki/Comma-separated_values#Example
  *     you know, the CSV Standard...
  *
*/

// const isDateType = (t) => (t.dataType === 'DateTime');
// const isStrValue = (v) => (typeof v === 'string');
const notEmpty = (str: string) => (str && str.length > 0 && str !== '');
const isNumeric = (v: any) => (typeof v === 'number' || /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(v)); // positive, negative, decimal points etc.
const isStrType = (t: any) => (t.dataType === 'String');

const rowsByExportType = {
  all: (rows: any[]) => (rows),
  visiblecolumns: (rows: any[]) => (rows),
  selected: (rows: any[], selected: any[]) => selected.map(((id: any) => rows[id])),
  visible: (rows: any[], selected: any[]) => rows
    .filter((row: any, id: any) => !selected.includes(id))
    .map((row: any[]) => row),
};

const CsvExport = {
  exportTypes: { All: 0 },
  sanitizer: (row: any[], column: any) => {
    let temp = row[column.name];
    temp = temp === null // ensure no 'null' is displayed in the csv.
      ? ''
      : temp;
    temp = typeof temp === 'object' // likely a react component. get the displayed value, not the actual.
      ? temp.props.children
      : temp;
    if (isStrType(column)) {
      temp = temp.trim(); // strip leading and trailing white spaces
      temp = temp.includes('"') // replace any dbl quote value with dbl-dbls
        ? `"${temp.replace(/"/g, '""')}"`
        : temp;
      temp = temp.includes(',') // Wrap in double quotes as it contains a comma.
        ? `"${temp}"`
        : temp;
      temp = isNumeric(temp) // fix leading 0's being dropped.
        ? `="${temp}"`
        : temp;
    }

    return temp;
  },
  getColumnSortOrder: (columns: any[]) => Object.keys(columns)
    .map((c) => columns[c])
    .filter((c) => (notEmpty(c.label) && notEmpty(c.name) && notEmpty(c.dataType)))
    .sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1)),
  getHeaderRow: (columns: any[], hiddenColumns: any[], exportTypeFlag: any) => {
    if (columns && Object.keys(columns).length > 0) {
      const headerRow: any[] = [];
      CsvExport.getColumnSortOrder(columns)
        .forEach((col) => {
          if (exportTypeFlag === 'visiblecolumns') {
            if (hiddenColumns.indexOf(col.name) < 0) {
              headerRow.push(col.label);
            }
          } else {
            headerRow.push(col.label);
          }
        });
      return headerRow.join(',');
    }
    throw new Error('An error occurred in CsvExport.getHeaderRow.');
  },
  getDataRows: (opts: any) => {
    const {
      columns, rows, exportTypeFlag, selected, hiddenColumns,
    } = opts;
    const sortedColumns = CsvExport.getColumnSortOrder(columns);
    const rowsArr: any[] = [];
    rowsByExportType[exportTypeFlag](rows, selected).forEach((row) => {
      const rowStrArr: any[] = [];
      sortedColumns
        .forEach((col) => {
          if (exportTypeFlag === 'visiblecolumns') {
            if (hiddenColumns.indexOf(col.name) < 0) {
              rowStrArr.push(CsvExport.sanitizer(row, col));
            }
          } else {
            rowStrArr.push(CsvExport.sanitizer(row, col));
          }
        });
      rowsArr.push(rowStrArr.join(','));
    });
    return rowsArr;
  },
  getExportData: (opts: any) => {
    const { columns, hiddenColumns, exportTypeFlag } = opts;
    const headerRow = CsvExport.getHeaderRow(columns, hiddenColumns, exportTypeFlag);
    const dataRows = CsvExport.getDataRows(opts);

    return `${headerRow}\r\n${dataRows.join('\r\n')}`;
  },
};

Object.freeze(CsvExport.exportTypes);

export default CsvExport;
