import * as React from 'react';

import DashboardView from 'pages/Views/DashboardView';
import FilterScheduleView from 'pages/Views/FilterScheduleView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './Ex-ProtectedRoute';
import NonLoginRoute from './NonLoginRoute';

const Login = React.lazy(() => import('pages/Views/ExLogin'));
const NotFound = React.lazy(() => import('pages/Views/404'));
const ApplyClassView = React.lazy(() => import('pages/Views/ApplyClassView'));
const ScheduleClassView = React.lazy(() =>
  import('pages/Views/ScheduleClassView')
);
const ScheduleClassByIdView = React.lazy(() =>
  import('pages/Views/ScheduleClassByIdView')
);
const LectureCreateView = React.lazy(() =>
  import('pages/Views/LectureCreateView')
);
const ScheduleListView = React.lazy(() =>
  import('pages/Views/ScheduleListView')
);
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <NotFound />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <NonLoginRoute>
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            </NonLoginRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <DashboardView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createClassroomForm"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ApplyClassView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/filterSchedule"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <FilterScheduleView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduleClass"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ScheduleClassView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduleClassById/:id"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ScheduleClassByIdView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecture-create"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <LectureCreateView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduledClasses"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ScheduleListView />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
