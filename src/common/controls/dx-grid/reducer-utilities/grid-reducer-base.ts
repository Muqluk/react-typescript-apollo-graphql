import FetchHandler from './reducer-actions/fetch-handler';
import SuccessHandler from './reducer-actions/success-handler';
import GridChangedHandler from './reducer-actions/grid-change-handler';
import ExternalFilterHandler from './reducer-actions/external-filter-handlers';
import FetchErrorHandler from './reducer-actions/fetch-error-handler';
import CsvExportHandler from './reducer-actions/csv-export-handler';

const GridReducerBase = {
  SearchFetch: FetchHandler,
  SearchFetchSuccess: SuccessHandler,
  GridChanged: GridChangedHandler,
  HandleExternalFilter: ExternalFilterHandler,
  SearchFetchError: FetchErrorHandler,
  HandleCsvExportRequest: CsvExportHandler,
};

export default GridReducerBase;
