import CsvExport from '../../utils/csv-export';

const CsvExportHandler = (opts: any) => {
  const { state, rootNode, payload } = opts;
  const columns = state.getIn([rootNode, 'apiMetaResults', 'searchMeta', 'columns'], []).toJS();
  const rows = state.getIn([rootNode, 'gridDataModel', 'rows'], []);
  const selected = state.getIn([rootNode, 'gridDataModel', 'selected'], []);
  const hiddenColumns = state.getIn([rootNode, 'gridDataModel', 'hiddenColumns'], []);
  const { exportTypeFlag } = payload;

  const exportData = CsvExport.getExportData({
    rows, columns, exportTypeFlag, selected, hiddenColumns,
  });

  payload.deliverExportCB(exportData);
  return state;
};

export default CsvExportHandler;
