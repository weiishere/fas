import {combineReducers} from 'redux-immutable';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import caches from '../../common/reducers/caches';
import versionList from './version-info/modules/version-list/reducer';
import versionInfo from './version-info/reducer';
import {fetchStatus} from './utils/fetchReducer';

export default combineReducers({
  routing,
  toast,
  fetchStatus,
  caches,
  versionList,
  versionInfo
})