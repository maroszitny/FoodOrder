import PropTypes from 'prop-types';
import R from 'ramda';

export const Endpoints = PropTypes.shape({
  alerts: PropTypes.string,
  assetConfirm: PropTypes.string,
  assetFlag: PropTypes.string,
  assetSign: PropTypes.string,
  assetUnconfirm: PropTypes.string,
  assetsUrl: PropTypes.string,
  authUrl: PropTypes.string,
  checkADP: PropTypes.string,
  checkEsig: PropTypes.string,
  checkPIN: PropTypes.string,
  checkloginSession: PropTypes.string,
  clearMarkers: PropTypes.string,
  clientlist: PropTypes.string,
  clockedinwidgetdata: PropTypes.string,
  deleteKey: PropTypes.string,
  deletePTOUrl: PropTypes.string,
  departmentList: PropTypes.string,
  departmentListJSON: PropTypes.string,
  digest: PropTypes.string,
  employeeList: PropTypes.string,
  esigSetup: PropTypes.string,
  expensedelete: PropTypes.string,
  expenselist: PropTypes.string,
  expensemeta: PropTypes.string,
  expensesave: PropTypes.string,
  flattenWO: PropTypes.string,
  flattenWOSearch: PropTypes.string,
  flattenWOXSD: PropTypes.string,
  generic: PropTypes.string,
  getClockStatus: PropTypes.string,
  getKey: PropTypes.string,
  getPTOUrl: PropTypes.string,
  getTicket: PropTypes.string,
  getTimesheetUrl: PropTypes.string,
  getexpense: PropTypes.string,
  getimage: PropTypes.string,
  getprojectfieldshidden: PropTypes.string,
  keyList: PropTypes.string,
  loginimage: PropTypes.string,
  logintext: PropTypes.string,
  logout: PropTypes.string,
  models: PropTypes.string,
  offlineData: PropTypes.string,
  perDiem: PropTypes.string,
  projectdata: PropTypes.string,
  projectdatax: PropTypes.string,
  projectlist: PropTypes.string,
  projectmeta: PropTypes.string,
  ptGetColor: PropTypes.string,
  ptSaveColor: PropTypes.string,
  ptSaveSize: PropTypes.string,
  reviewphotossubs: PropTypes.string,
  saveClock: PropTypes.string,
  saveConnectionErrorLog: PropTypes.string,
  saveCustomTab: PropTypes.string,
  saveDomainPW: PropTypes.string,
  saveException: PropTypes.string,
  saveKey: PropTypes.string,
  saveMarksUrl: PropTypes.string,
  savePTOUrl: PropTypes.string,
  savePerDiem: PropTypes.string,
  savePerDiemMeal: PropTypes.string,
  saveUserField: PropTypes.string,
  saveWorkLog: PropTypes.string,
  savedebug: PropTypes.string,
  setesig: PropTypes.string,
  sitephotosfinish: PropTypes.string,
  sitephotosgallery: PropTypes.string,
  sitephotosimgupload: PropTypes.string,
  sitephotosupload: PropTypes.string,
  ticketSearch: PropTypes.string,
  ticketSearchByWO: PropTypes.string,
  truckList: PropTypes.string,
  tsApprove: PropTypes.string,
  tsComments: PropTypes.string,
  tsLocked: PropTypes.string,
  uploadToTicketUrl: PropTypes.string,
  widgetList: PropTypes.string,
  widgetSaveOrder: PropTypes.string,
  workLog: PropTypes.string,
  workLogData: PropTypes.string,
});

export const transformEndpoints = (originalEndpoints) => R.pipe(R.pick(['id', 'name', 'email', 'role', 'lockoutInfo']))(originalEndpoints);

export const transformEndpointList = R.pipe(
  R.map(transformEndpoints),
  R.sortWith([R.ascend(R.prop('name'))]),
);
