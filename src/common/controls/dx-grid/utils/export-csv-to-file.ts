export const exportCsvToFile = (CSV: any, filename: any) => {
  if (filename && filename.length > 0) {
    const exportFileName = filename;
    if (CSV !== '') {
      const blob = new Blob([CSV], { type: 'text/csv' });

      if (window.navigator['msSaveOrOpenBlob']) { // eslint-disable-line
        window.navigator['msSaveBlob'](blob, exportFileName); // eslint-disable-line
      } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = exportFileName;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    }
  }
};
