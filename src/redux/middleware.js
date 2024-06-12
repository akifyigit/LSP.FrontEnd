import { signUpMiddleware } from 'redux/slices/signUp/SignUpApi';

import { classroomApiMiddleware } from './slices/classes/classroomApi';
import { dashboardApiMiddleware } from './slices/dashboard/dashboardApi';
import { lectureApiMiddleware } from './slices/lecture/lectureApi';
import { loginApiMiddleware } from './slices/login/loginApi';
import { scheduleApiMiddleware } from './slices/schedule/scheduleApi';
const middleware = [
  loginApiMiddleware,
  signUpMiddleware,
  classroomApiMiddleware,
  scheduleApiMiddleware,
  lectureApiMiddleware,
  dashboardApiMiddleware,
];

export default middleware;
