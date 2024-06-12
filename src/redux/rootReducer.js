import {
  localizationReducer,
  localizationReducerName,
} from 'redux/slices/app/localizationSlice';
import {
  signUpApiReducer,
  signUpApiReducerName,
} from 'redux/slices/signUp/SignUpApi';
import {
  signUpReducer,
  signUpReducerName,
} from 'redux/slices/signUp/signUpSlice';
import { userReducer, userReducerName } from 'redux/slices/user/userSlice';

import {
  classesReducer,
  classesReducerName,
} from './slices/classes/classesSlice';
import {
  classroomApiReducer,
  classroomApiReducerName,
} from './slices/classes/classroomApi';
import {
  dashboardApiReducer,
  dashboardApiReducerName,
} from './slices/dashboard/dashboardApi';
import {
  lectureApiReducer,
  lectureApiReducerName,
} from './slices/lecture/lectureApi';
import {
  lectureReducer,
  lectureReducerName,
} from './slices/lecture/lectureSlice';
import { loginApiReducer, loginApiReducerName } from './slices/login/loginApi';
import {
  filterReducer,
  filterReducerName,
} from './slices/schedule/filterSlice';
import {
  scheduleApiReducer,
  scheduleApiReducerName,
} from './slices/schedule/scheduleApi';
import {
  scheduleReducer,
  scheduleReducerName,
} from './slices/schedule/scheduleSlice';

const rootReducer = {
  [userReducerName]: userReducer,
  [localizationReducerName]: localizationReducer,
  [signUpReducerName]: signUpReducer,
  [signUpApiReducerName]: signUpApiReducer,
  [classesReducerName]: classesReducer,
  [loginApiReducerName]: loginApiReducer,
  [classroomApiReducerName]: classroomApiReducer,
  [scheduleApiReducerName]: scheduleApiReducer,
  [scheduleReducerName]: scheduleReducer,
  [filterReducerName]: filterReducer,
  [lectureApiReducerName]: lectureApiReducer,
  [lectureReducerName]: lectureReducer,
  [dashboardApiReducerName]: dashboardApiReducer,
};

export default rootReducer;
