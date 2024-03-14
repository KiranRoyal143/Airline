import { fetchFlights } from './actions/flightsActions';

export const myStoreEnhancer = (store) => (next) => (action) => {
  // Continue the action down the middleware chain
  const result = next(action);

  // Dispatch the fetchFlights action
  if (action.type === 'SOME_INITIAL_ACTION') {
    store.dispatch(fetchFlights());
  }

  return result;
};
