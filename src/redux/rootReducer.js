import {
  flightsApiReducer,
  flightsApiReducerName,
} from './slices/flights/flightsApi';
import {
  filterReducer,
  filterReducerName,
} from './slices/flights/flightsFilterSlice';
import {
  flightsLocalApiReducer,
  flightsLocalApiReducerName,
} from './slices/flights/flightsLocalApi';

const rootReducer = {
  [filterReducerName]: filterReducer,
  [flightsApiReducerName]: flightsApiReducer,
  [flightsLocalApiReducerName]: flightsLocalApiReducer,
};

export default rootReducer;
