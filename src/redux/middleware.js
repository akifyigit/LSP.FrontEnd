import { flightsApiMiddleware } from './slices/flights/flightsApi';
import { flightsLocalApiMiddleware } from './slices/flights/flightsLocalApi';
const middleware = [flightsApiMiddleware, flightsLocalApiMiddleware];

export default middleware;
