import * as React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const NotFound = React.lazy(() => import('pages/Views/404'));
const FlightsView = React.lazy(() => import('../pages/Views/FlightsView'));
const BookedFlightsView = React.lazy(() =>
  import('pages/Views/BookedFlightsView')
);

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <React.Suspense fallback={<>...</>}>
              <NotFound />
            </React.Suspense>
          }
        />
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <FlightsView />
            </React.Suspense>
          }
        />
        <Route
          path="/booked-flights"
          element={
            <React.Suspense fallback={<>...</>}>
              <BookedFlightsView />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
